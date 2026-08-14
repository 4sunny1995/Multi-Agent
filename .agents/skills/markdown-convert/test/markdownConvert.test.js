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

test('does not mangle words with underscores or code spans into strange characters', () => {
  const markdown = 'Biến `my_variable_name` và `get_user_by_id()` và text `sample_code_span` hiển thị chuẩn.';
  const html = parseMarkdownToHtml(markdown);
  assert.doesNotMatch(html, /%%CODE/);
  assert.doesNotMatch(html, /CODESPAN/);
  assert.match(html, /<code>my_variable_name<\/code>/);
  assert.match(html, /<code>get_user_by_id\(\)<\/code>/);
});

test('parses markdown links and images correctly', () => {
  const markdown = 'Xem [Tài liệu hướng dẫn](https://example.com/guide) và ảnh ![Logo](https://example.com/logo.png)';
  const html = parseMarkdownToHtml(markdown);
  assert.match(html, /<a href="https:\/\/example\.com\/guide">Tài liệu hướng dẫn<\/a>/);
  assert.match(html, /<img src="https:\/\/example\.com\/logo\.png" alt="Logo">/);
});

test('parses tables into structured HTML table', () => {
  const markdown = '| Cột 1 | Cột 2 |\n| :--- | :--- |\n| Giá trị A | Giá trị B |';
  const html = parseMarkdownToHtml(markdown);
  assert.match(html, /<table>/);
  assert.match(html, /<th>Cột 1<\/th>/);
  assert.match(html, /<td>Giá trị A<\/td>/);
});

test('parses fenced code blocks without mangling content', () => {
  const markdown = '```js\nconst x = "<div class=\'test\'>Hello</div>";\n```';
  const html = parseMarkdownToHtml(markdown);
  assert.match(html, /<pre><code class="language-js">const x = &quot;&lt;div class=&#39;test&#39;&gt;Hello&lt;\/div&gt;&quot;;<\/code><\/pre>/);
});

test('parses alerts and blockquotes correctly', () => {
  const markdown = '> [!IMPORTANT]\n> Lưu ý quan trọng khi vận hành hệ thống.';
  const html = parseMarkdownToHtml(markdown);
  assert.match(html, /<blockquote class="alert-important">/);
  assert.match(html, /Lưu ý quan trọng khi vận hành hệ thống\./);
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
  assert.match(html, /<table>/);
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
