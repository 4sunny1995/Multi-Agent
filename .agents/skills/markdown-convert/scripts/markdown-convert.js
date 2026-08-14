#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeHtml(text) {
  if (typeof text !== 'string') return '';
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
  const codeSpans = [];
  const placeholderPrefix = '\u0000CODESPAN';

  // 1. Trích xuất và bảo vệ inline code `code` trước khi escape HTML
  let processed = text.replace(/`([^`]+)`/g, (match, codeText) => {
    const placeholder = `${placeholderPrefix}${codeSpans.length}\u0000`;
    codeSpans.push(`<code>${escapeHtml(codeText)}</code>`);
    return placeholder;
  });

  // 2. Escape HTML các ký tự đặc biệt ngoài code spans
  processed = escapeHtml(processed);

  // 3. Khôi phục các thẻ <br> hợp lệ
  processed = processed.replace(/&lt;br\s*\/?&gt;/gi, '<br>');

  // 4. Task list checkboxes
  processed = processed.replace(/^\[ \]\s+/g, '<input type="checkbox" disabled> ');
  processed = processed.replace(/^\[[xX]\]\s+/g, '<input type="checkbox" checked disabled> ');

  // 5. Images: ![alt](url)
  processed = processed.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
    const normalizedUrl = normalizeAbsolutePaths(url.trim(), projectRoot);
    return `<img src="${normalizedUrl}" alt="${alt}">`;
  });

  // 6. Links: [text](url)
  processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
    const normalizedUrl = normalizeAbsolutePaths(url.trim(), projectRoot);
    return `<a href="${normalizedUrl}">${linkText}</a>`;
  });

  // 7. Bold & Italic (tránh dùng ký tự _ dễ gây xung đột identifier)
  processed = processed.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  processed = processed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  processed = processed.replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');
  processed = processed.replace(/~~(.+?)~~/g, '<del>$1</del>');

  // 8. Chuẩn hóa đường dẫn tuyệt đối cho text thông thường
  processed = normalizeAbsolutePaths(processed, projectRoot);

  // 9. Khôi phục inline code
  return processed.replace(/\u0000CODESPAN(\d+)\u0000/g, (_, index) => codeSpans[Number(index)]);
}

function parseMarkdownToHtml(markdown, projectRoot = process.cwd()) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');

  let html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Converted Markdown</title>
  <style>
    :root {
      --bg-color: #ffffff;
      --text-color: #1f2937;
      --border-color: #e5e7eb;
      --code-bg: #f3f4f6;
      --pre-bg: #1e1e2e;
      --pre-text: #cdd6f4;
      --link-color: #2563eb;
      --blockquote-bg: #f8fafc;
      --blockquote-border: #3b82f6;
      --table-header-bg: #f9fafb;
      --table-alt-bg: #fdfdfd;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg-color: #0f172a;
        --text-color: #f1f5f9;
        --border-color: #334155;
        --code-bg: #1e293b;
        --pre-bg: #020617;
        --pre-text: #e2e8f0;
        --link-color: #60a5fa;
        --blockquote-bg: #1e293b;
        --blockquote-border: #60a5fa;
        --table-header-bg: #1e293b;
        --table-alt-bg: #0f172a;
      }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      max-width: 900px;
      margin: 2rem auto;
      padding: 0 1.5rem;
      line-height: 1.7;
      color: var(--text-color);
      background-color: var(--bg-color);
    }
    h1, h2, h3, h4, h5, h6 {
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      font-weight: 600;
      line-height: 1.3;
    }
    h1 { font-size: 2rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.4rem; }
    h2 { font-size: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.3rem; }
    h3 { font-size: 1.25rem; }
    p { margin: 0.8em 0; }
    a { color: var(--link-color); text-decoration: none; }
    a:hover { text-decoration: underline; }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      background: var(--code-bg);
      padding: 0.2em 0.4em;
      border-radius: 4px;
      font-size: 0.9em;
    }
    pre {
      background: var(--pre-bg);
      color: var(--pre-text);
      padding: 1rem 1.2rem;
      border-radius: 8px;
      overflow-x: auto;
      margin: 1.2rem 0;
    }
    pre code {
      background: transparent;
      padding: 0;
      color: inherit;
      font-size: 0.9em;
    }
    blockquote {
      margin: 1.2rem 0;
      padding: 0.8rem 1.2rem;
      border-left: 4px solid var(--blockquote-border);
      background: var(--blockquote-bg);
      border-radius: 0 8px 8px 0;
    }
    blockquote.alert-note { border-left-color: #3b82f6; }
    blockquote.alert-tip { border-left-color: #10b981; }
    blockquote.alert-important { border-left-color: #8b5cf6; }
    blockquote.alert-warning { border-left-color: #f59e0b; }
    blockquote.alert-caution { border-left-color: #ef4444; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      font-size: 0.95rem;
    }
    th, td {
      border: 1px solid var(--border-color);
      padding: 0.6rem 1rem;
      text-align: left;
    }
    th {
      background: var(--table-header-bg);
      font-weight: 600;
    }
    tr:nth-child(even) td {
      background: var(--table-alt-bg);
    }
    ul, ol {
      padding-left: 2rem;
      margin: 0.8em 0;
    }
    li { margin: 0.3em 0; }
    hr {
      border: 0;
      height: 1px;
      background: var(--border-color);
      margin: 2rem 0;
    }
    img {
      max-width: 100%;
      height: auto;
      border-radius: 6px;
    }
    input[type="checkbox"] {
      margin-right: 0.5rem;
      vertical-align: middle;
    }
  </style>
</head>
<body>
`;

  let inList = false;
  let listType = null; // 'ul' or 'ol'
  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockLines = [];
  let inTable = false;
  let tableRows = [];
  let inBlockquote = false;
  let blockquoteClass = '';
  let blockquoteLines = [];

  function flushList() {
    if (inList) {
      html += listType === 'ol' ? '</ol>\n' : '</ul>\n';
      inList = false;
      listType = null;
    }
  }

  function flushBlockquote() {
    if (inBlockquote) {
      const className = blockquoteClass ? ` class="${blockquoteClass}"` : '';
      html += `<blockquote${className}>\n`;
      blockquoteLines.forEach((bLine) => {
        html += `<p>${parseInlineMarkdown(bLine, projectRoot)}</p>\n`;
      });
      html += '</blockquote>\n';
      inBlockquote = false;
      blockquoteClass = '';
      blockquoteLines = [];
    }
  }

  function flushTable() {
    if (inTable) {
      if (tableRows.length > 0) {
        html += '<table>\n';
        const [headerRow, ...bodyRows] = tableRows;
        html += '  <thead>\n    <tr>\n';
        headerRow.forEach((cell) => {
          html += `      <th>${parseInlineMarkdown(cell, projectRoot)}</th>\n`;
        });
        html += '    </tr>\n  </thead>\n';

        if (bodyRows.length > 0) {
          html += '  <tbody>\n';
          bodyRows.forEach((row) => {
            html += '    <tr>\n';
            row.forEach((cell) => {
              html += `      <td>${parseInlineMarkdown(cell, projectRoot)}</td>\n`;
            });
            html += '    </tr>\n';
          });
          html += '  </tbody>\n';
        }
        html += '</table>\n';
      }
      inTable = false;
      tableRows = [];
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Code block fence
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        // Kết thúc code block
        const escapedCode = escapeHtml(codeBlockLines.join('\n'));
        const langClass = codeBlockLang ? ` class="language-${escapeHtml(codeBlockLang)}"` : '';
        html += `<pre><code${langClass}>${escapedCode}</code></pre>\n`;
        inCodeBlock = false;
        codeBlockLang = '';
        codeBlockLines = [];
        continue;
      } else {
        // Bắt đầu code block
        flushList();
        flushBlockquote();
        flushTable();
        inCodeBlock = true;
        codeBlockLang = trimmed.slice(3).trim();
        codeBlockLines = [];
        continue;
      }
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // 2. Table handling
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList();
      flushBlockquote();
      const cells = trimmed
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim());

      // Kiểm tra xem có phải dòng phân cách (| --- | --- |) không
      const isSeparator = cells.every((c) => /^:?-+:?$/.test(c));
      if (isSeparator) {
        continue;
      }

      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      tableRows.push(cells);
      continue;
    } else {
      flushTable();
    }

    // 3. Blockquote & Alerts (> [!NOTE], > [!IMPORTANT], ...)
    if (trimmed.startsWith('>')) {
      flushList();
      let content = trimmed.replace(/^>\s?/, '');
      const alertMatch = content.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
      if (alertMatch) {
        if (!inBlockquote) {
          inBlockquote = true;
          blockquoteClass = `alert-${alertMatch[1].toLowerCase()}`;
        }
        continue;
      }
      if (!inBlockquote) {
        inBlockquote = true;
      }
      blockquoteLines.push(content);
      continue;
    } else {
      flushBlockquote();
    }

    // 4. Horizontal Rule
    if (/^(?:---|\*\*\*|___)$/.test(trimmed)) {
      flushList();
      html += '<hr>\n';
      continue;
    }

    // 5. Headings
    if (/^#{1,6}\s+/.test(trimmed)) {
      flushList();
      const level = trimmed.match(/^#+/)[0].length;
      const text = trimmed.replace(/^#{1,6}\s+/, '').trim();
      html += `<h${level}>${parseInlineMarkdown(text, projectRoot)}</h${level}>\n`;
      continue;
    }

    // 6. Unordered List (- item, * item)
    if (/^[-*]\s+/.test(trimmed)) {
      if (!inList || listType !== 'ul') {
        flushList();
        html += '<ul>\n';
        inList = true;
        listType = 'ul';
      }
      const itemText = trimmed.replace(/^[-*]\s+/, '');
      html += `<li>${parseInlineMarkdown(itemText, projectRoot)}</li>\n`;
      continue;
    }

    // 7. Ordered List (1. item, 2. item)
    if (/^\d+\.\s+/.test(trimmed)) {
      if (!inList || listType !== 'ol') {
        flushList();
        html += '<ol>\n';
        inList = true;
        listType = 'ol';
      }
      const itemText = trimmed.replace(/^\d+\.\s+/, '');
      html += `<li>${parseInlineMarkdown(itemText, projectRoot)}</li>\n`;
      continue;
    }

    // Empty line
    if (!trimmed) {
      flushList();
      continue;
    }

    // Paragraph
    flushList();
    html += `<p>${parseInlineMarkdown(trimmed, projectRoot)}</p>\n`;
  }

  flushList();
  flushBlockquote();
  flushTable();

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

async function exportHtmlToImage(html, outputPath) {
  ensureDir(path.dirname(outputPath));
  let puppeteer;
  try {
    puppeteer = (await import('puppeteer')).default;
  } catch (err) {
    throw new Error('Thư viện puppeteer chưa được cài đặt. Vui lòng chạy "npm install puppeteer" để sử dụng tính năng xuất PNG.');
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    await page.setViewport({ width: 1200, height: 1600 });
    await page.screenshot({ path: outputPath, type: 'png', fullPage: true });
  } finally {
    await browser.close();
  }
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

  const content = lines.map((line, idx) => `<text x="40" y="${60 + idx * 28}">${escapeHtml(line)}</text>`).join('\n');
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
    const placeholderPrefix = '\u0000CODESPAN';
    const withCode = line.replace(/`([^`]+)`/g, (match) => {
      const placeholder = `${placeholderPrefix}${codeSpans.length}\u0000`;
      codeSpans.push(match);
      return placeholder;
    });

    const normalized = normalizeAbsolutePaths(withCode, projectRoot);

    return normalized.replace(/\u0000CODESPAN(\d+)\u0000/g, (_, index) => codeSpans[Number(index)]);
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
