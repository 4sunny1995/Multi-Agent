#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizePathToProjectRoot(value, projectRoot) {
  if (!value) {
    return value;
  }

  const normalizedRoot = path.posix.normalize(projectRoot.replace(/\\/g, '/'));
  let normalizedValue = path.posix.normalize(value.replace(/\\/g, '/'));

  if (!normalizedValue.startsWith('/') && value.startsWith('/')) {
    normalizedValue = '/' + normalizedValue;
  }

  if (normalizedValue.startsWith(normalizedRoot)) {
    const trimmed = normalizedValue.slice(normalizedRoot.length);
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  }

  const rootName = path.posix.basename(normalizedRoot);
  const rootIndex = normalizedValue.indexOf(`/${rootName}/`);
  if (rootIndex !== -1) {
    const trimmed = normalizedValue.slice(rootIndex + rootName.length + 1);
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  }

  return value;
}

function normalizeAbsolutePaths(text, defaultProjectRoot = process.cwd()) {
  const fileUrlReplacer = (fullMatch, filePath) => {
    const absolutePath = filePath.startsWith('/') ? filePath : '/' + filePath;
    const projectRoot = findProjectRoot(absolutePath) || defaultProjectRoot;
    return normalizePathToProjectRoot(absolutePath, projectRoot);
  };

  let replaced = text.replace(/file:\/\/(?:\/)?([^\s)]+)/g, fileUrlReplacer);
  replaced = replaced.replace(/(?<![A-Za-z0-9_])\/[A-Za-z0-9_\/.-]+\b/g, (match) => {
    const projectRoot = findProjectRoot(match);
    if (!projectRoot) {
      return match;
    }
    const normalized = normalizePathToProjectRoot(match, projectRoot);
    return normalized === match ? match : normalized;
  });

  return replaced;
}

function parseInlineMarkdown(text, projectRoot) {
  const escaped = escapeHtml(text);
  const codeSpans = [];
  const placeholderPrefix = '%%CODE_SPAN_';

  const withCode = escaped.replace(/`([^`]+)`/g, (match, codeText) => {
    const placeholder = `${placeholderPrefix}${codeSpans.length}%%`;
    codeSpans.push(`<code>${codeText}</code>`);
    return placeholder;
  });

  const withBold = withCode.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  const withBr = withBold.replace(/&lt;br\s*\/?&gt;/gi, '<br>');
  const normalized = normalizeAbsolutePaths(withBr, projectRoot);

  return normalized.replace(new RegExp(`${placeholderPrefix}(\\d+)%%`, 'g'), (_, index) => codeSpans[Number(index)]);
}

function parseMarkdownToHtml(markdown, projectRoot = process.cwd()) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  let html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Converted Markdown</title>\n  <style>body{font-family:Arial,sans-serif;max-width:900px;margin:2rem auto;line-height:1.6;}code{background:#f3f4f6;padding:2px 4px;border-radius:4px;}</style>\n</head>\n<body>\n';
  let inList = false;

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (/^#{1,6}\s+/.test(trimmed)) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      const level = trimmed.match(/^#+/)[0].length;
      const text = trimmed.replace(/^#{1,6}\s+/, '').trim();
      html += `<h${level}>${parseInlineMarkdown(text, projectRoot)}</h${level}>\n`;
      return;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      if (!inList) {
        html += '<ul>\n';
        inList = true;
      }
      html += `<li>${parseInlineMarkdown(trimmed.replace(/^[-*]\s+/, ''), projectRoot)}</li>\n`;
      return;
    }

    if (inList) {
      html += '</ul>\n';
      inList = false;
    }

    if (!trimmed) {
      return;
    }

    if (/^```/.test(trimmed)) {
      return;
    }

    html += `<p>${parseInlineMarkdown(trimmed, projectRoot)}</p>\n`;
  });

  if (inList) {
    html += '</ul>\n';
  }

  html += '</body>\n</html>\n';
  return html;
}

function buildCsvFromHeadings(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const rows = [];
  const stack = [];
  let idCounter = 1;

  rows.push('id,title,level,parent_id,path');

  lines.forEach((line) => {
    const trimmed = line.trim();
    const heading = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (!heading) return;

    const level = heading[1].length;
    const title = heading[2].trim();

    while (stack.length >= level) {
      stack.pop();
    }

    const parent = stack[stack.length - 1] || null;
    const parentId = parent ? parent.id : '';
    const parentPath = parent ? parent.path : '';
    const path = parentPath ? `${parentPath} > ${title}` : title;

    const row = {
      id: idCounter,
      title,
      level,
      parent_id: parentId,
      path
    };

    rows.push(`${row.id},${row.title},${row.level},${row.parent_id},${row.path}`);
    stack.push(row);
    idCounter += 1;
  });

  return rows.join('\n');
}

function ensureDir(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function escapeCsvValue(value) {
  const stringValue = String(value ?? '');
  return /[",\n]/.test(stringValue) ? `"${stringValue.replace(/"/g, '""')}"` : stringValue;
}

function exportHtmlToImage(html, outputPath) {
  return (async () => {
    ensureDir(path.dirname(outputPath));
    const browser = await puppeteer.launch({ headless: 'new' });
    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'domcontentloaded' });
      await page.setViewport({ width: 1200, height: 1600 });
      await page.screenshot({ path: outputPath, type: 'png', fullPage: true });
    } finally {
      await browser.close();
    }
  })();
}

function exportHtmlToSvg(html, outputPath) {
  ensureDir(path.dirname(outputPath));
  const lines = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const content = lines.map((line) => `<text x="40" y="${60 + lines.indexOf(line) * 28}">${escapeHtml(line)}</text>`).join('\n');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${Math.max(300, 80 + lines.length * 28)}">\n  <rect width="100%" height="100%" fill="white"/>\n  <g font-family="Arial, sans-serif" font-size="24">${content}</g>\n</svg>\n`;
  writeFileSync(outputPath, svg, 'utf8');
}

function findProjectRoot(startPath) {
  let current = path.resolve(startPath);
  if (!existsSync(current)) {
    current = path.dirname(current);
  }

  while (current && current !== '/') {
    if (existsSync(path.join(current, 'package.json')) || existsSync(path.join(current, '.git'))) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) {
      break;
    }
    current = parent;
  }
  return null;
}

function normalizeMarkdownAbsolutePaths(markdown, projectRoot) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  let inCodeBlock = false;

  const processedLines = lines.map((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      return line;
    }
    if (inCodeBlock) {
      return line;
    }

    const codeSpans = [];
    const placeholderPrefix = '%%CODE_SPAN_';
    const withCode = line.replace(/`([^`]+)`/g, (match) => {
      const placeholder = `${placeholderPrefix}${codeSpans.length}%%`;
      codeSpans.push(match);
      return placeholder;
    });

    const normalized = normalizeAbsolutePaths(withCode, projectRoot);

    return normalized.replace(new RegExp(`${placeholderPrefix}(\\d+)%%`, 'g'), (_, index) => codeSpans[Number(index)]);
  });

  return processedLines.join('\n');
}

async function convertMarkdown(inputPath, outputPath, format = 'html') {
  const markdown = readFileSync(inputPath, 'utf8');
  const projectRoot = findProjectRoot(inputPath) || process.cwd();
  const html = parseMarkdownToHtml(markdown, projectRoot);
  ensureDir(path.dirname(outputPath));

  if (format === 'html') {
    writeFileSync(outputPath, html, 'utf8');
    return;
  }

  if (format === 'md' || format === 'markdown') {
    writeFileSync(outputPath, normalizeMarkdownAbsolutePaths(markdown, projectRoot), 'utf8');
    return;
  }

  if (format === 'csv') {
    writeFileSync(outputPath, buildCsvFromHeadings(markdown), 'utf8');
    return;
  }

  if (format === 'png' || format === 'svg') {
    if (format === 'png') {
      await exportHtmlToImage(html, outputPath);
    } else {
      exportHtmlToSvg(html, outputPath);
    }
    return;
  }

  throw new Error(`Unsupported format: ${format}`);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log('Usage: node scripts/markdown-convert.js <input.md> <output> [html|png|svg|csv|md]');
    process.exit(1);
  }

  const [inputPath, outputPath, format = 'html'] = args;
  const absInput = path.resolve(process.cwd(), inputPath);
  const absOutput = path.resolve(process.cwd(), outputPath);
  await convertMarkdown(absInput, absOutput, format);
  console.log(`Converted ${path.basename(absInput)} -> ${path.basename(absOutput)} (${format})`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { parseMarkdownToHtml, buildCsvFromHeadings, convertMarkdown, normalizeMarkdownAbsolutePaths };
