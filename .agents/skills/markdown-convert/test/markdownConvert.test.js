import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import { parseMarkdownToHtml, buildCsvFromHeadings, convertMarkdown, normalizeMarkdownAbsolutePaths } from '../scripts/markdown-convert.js';

test('parses headings and paragraphs into HTML', () => {
  const markdown = '# Title\n\nHello world\n\n## Subtitle\n\n- one\n- two';
  const html = parseMarkdownToHtml(markdown);
  assert.match(html, /<h1>Title<\/h1>/);
  assert.match(html, /<p>Hello world<\/p>/);
  assert.match(html, /<h2>Subtitle<\/h2>/);
  assert.match(html, /<ul>/);
});

test('parses bold and inline code formatting', () => {
  const markdown = 'This is **bold** text and this is `inline code`.';
  const html = parseMarkdownToHtml(markdown);
  assert.match(html, /<p>This is <strong>bold<\/strong> text and this is <code>inline code<\/code>\.<\/p>/);
});

test('parses br tags correctly while preserving escaped br inside inline code', () => {
  const markdown = 'Line 1<br>Line 2<br/>Line 3<br />Line 4 and `code<br>tag`';
  const html = parseMarkdownToHtml(markdown);
  assert.match(html, /<p>Line 1<br>Line 2<br>Line 3<br>Line 4 and <code>code&lt;br&gt;tag<\/code><\/p>/);
});

test('normalizes absolute file paths to project-relative paths', () => {
  const markdown = 'Link: file:///home/rcvn/workspaces/5needs/v4legacy/docs/architecture.html';
  const html = parseMarkdownToHtml(markdown, '/home/rcvn/workspaces/5needs/v4legacy');
  assert.match(html, /Link: \/docs\/architecture\.html/);
});

test('builds a sensible hierarchical CSV structure', () => {
  const markdown = '# Parent\n\n## Child\n\n### Grandchild';
  const csv = buildCsvFromHeadings(markdown);
  assert.match(csv, /id,title,level,parent_id,path/);
  assert.match(csv, /Parent,1,,Parent/);
  assert.match(csv, /Child,2,1,Parent > Child/);
  assert.match(csv, /Grandchild,3,2,Parent > Child > Grandchild/);
});

test('reads sample markdown from file', () => {
  const markdown = readFileSync(new URL('../examples/sample.md', import.meta.url), 'utf8');
  const html = parseMarkdownToHtml(markdown);
  assert.match(html, /<h1>Deployment and Operations Guide - V4 Legacy Project<\/h1>/);
});

test('writes output files to a new directory', async () => {
  const outputPath = path.resolve('tmp-output/demo.html');
  await convertMarkdown(new URL('../examples/sample.md', import.meta.url).pathname, outputPath, 'html');
  assert.equal(existsSync(outputPath), true);
  rmSync(path.dirname(outputPath), { recursive: true, force: true });
});

test('exports png and svg files', async () => {
  const pngPath = path.resolve('tmp-output/demo.png');
  const svgPath = path.resolve('tmp-output/demo.svg');
  await convertMarkdown(new URL('../examples/sample.md', import.meta.url).pathname, pngPath, 'png');
  await convertMarkdown(new URL('../examples/sample.md', import.meta.url).pathname, svgPath, 'svg');
  assert.equal(existsSync(pngPath), true);
  assert.equal(existsSync(svgPath), true);
  rmSync(path.dirname(pngPath), { recursive: true, force: true });
});

test('normalizes absolute paths in markdown text while ignoring code spans', () => {
  const markdown = 'Link: file:///home/rcvn/workspaces/5needs/v4legacy/docs/architecture.html\nCode: `file:///home/rcvn/workspaces/5needs/v4legacy/docs/architecture.html`';
  const projectRoot = '/home/rcvn/workspaces/5needs/v4legacy';
  const res = normalizeMarkdownAbsolutePaths(markdown, projectRoot);
  assert.match(res, /Link: \/docs\/architecture\.html/);
  assert.match(res, /Code: `file:\/\/\/home\/rcvn\/workspaces\/5needs\/v4legacy\/docs\/architecture\.html`/);
});

test('converts markdown and normalizes absolute paths to a new md file', async () => {
  const outputPath = path.resolve('tmp-output/demo.md');
  await convertMarkdown(new URL('../examples/sample.md', import.meta.url).pathname, outputPath, 'md');
  assert.equal(existsSync(outputPath), true);
  const content = readFileSync(outputPath, 'utf8');
  assert.match(content, /Deployment and Operations Guide - V4 Legacy Project/);
  // Verify that absolute paths are converted to relative
  assert.match(content, /\[System Architecture Diagram \(HTML\)\]\(\/docs\/architecture\.html\)/);
  rmSync(path.dirname(outputPath), { recursive: true, force: true });
});
