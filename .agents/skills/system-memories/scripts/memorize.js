#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { findProjectRoot, scanWorkspace } from './scanner.js';
import { syncStateFile } from './state_sync.js';
import { generateMemoryDashboardHtml } from './html_generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Đảm bảo thư mục tồn tại
 */
function ensureDir(dirPath) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Đọc danh sách Snapshots từ .agents/memories/snapshots.json
 */
export function loadSnapshots(rootDir) {
  const memDir = path.join(rootDir, '.agents', 'memories');
  const snapsFile = path.join(memDir, 'snapshots.json');
  if (!existsSync(snapsFile)) {
    return [];
  }
  try {
    const raw = readFileSync(snapsFile, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Lưu danh sách Snapshots
 */
export function saveSnapshots(rootDir, snapshots) {
  const memDir = path.join(rootDir, '.agents', 'memories');
  ensureDir(memDir);
  const snapsFile = path.join(memDir, 'snapshots.json');
  writeFileSync(snapsFile, JSON.stringify(snapshots, null, 2), 'utf8');

  // Ghi nhật ký dạng Markdown dễ đọc
  const logFile = path.join(memDir, 'MEMORY_LOG.md');
  const markdownRows = snapshots.slice(-20).reverse().map(s => {
    const timeStr = new Date(s.timestamp).toLocaleString('vi-VN');
    return `| \`${s.id}\` | **${s.author || 'SYSTEM'}** | ${s.message || 'Checkpoint'} | \`${s.git?.branch || 'main'}\` | ${timeStr} |`;
  }).join('\n');

  const logContent = `# 🧠 Antigravity System Memory Log (MMS-001)

> **Summary**: Nhật ký lưu vết các mốc biến đổi kiến trúc và trạng thái dự án theo chuỗi thời gian.

| Checkpoint ID | Tác giả (Role) | Nội dung / Thay đổi | Nhánh Git | Thời gian |
| :--- | :--- | :--- | :--- | :--- |
${markdownRows}

---
*Tự động sinh bởi \`system-memories\` skill.*
`;
  writeFileSync(logFile, logContent, 'utf8');
}

/**
 * Tạo một Snapshot mới
 */
export function createSnapshot(rootDir, options = {}) {
  const scan = scanWorkspace(rootDir);
  const snapshots = loadSnapshots(rootDir);

  const snapshotId = `mem-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
  const newSnapshot = {
    id: snapshotId,
    timestamp: new Date().toISOString(),
    message: options.message || 'Cập nhật trạng thái hệ thống',
    author: options.author || 'DEV Agent',
    triggerAction: options.triggerAction || 'workflow:dev',
    git: scan.git,
    techStack: scan.techStack,
    agentsStats: scan.agentsStats,
    coreDirectories: scan.coreDirectories
  };

  snapshots.push(newSnapshot);
  saveSnapshots(rootDir, snapshots);
  return { snapshot: newSnapshot, snapshots, scan };
}

/**
 * Xuất file HTML Dashboard
 */
export function exportDashboard(rootDir, snapshots, scan) {
  const html = generateMemoryDashboardHtml(snapshots, scan);
  
  // 1. Lưu tại .agents/memories/
  const memDir = path.join(rootDir, '.agents', 'memories');
  ensureDir(memDir);
  const htmlPath1 = path.join(memDir, 'memories_dashboard.html');
  writeFileSync(htmlPath1, html, 'utf8');

  // 2. Đồng bộ sang docs/original/metrics/
  const docsMetricsDir = path.join(rootDir, 'docs', 'original', 'metrics');
  ensureDir(docsMetricsDir);
  const htmlPath2 = path.join(docsMetricsDir, 'system_memories.html');
  writeFileSync(htmlPath2, html, 'utf8');

  return { htmlPath1, htmlPath2 };
}

/**
 * Pipeline chạy tự động (Scan -> Snapshot -> Sync STATE.md -> Export HTML)
 */
export async function runAutoPipeline(rootDir = findProjectRoot(), message = 'Cập nhật trạng thái hệ thống', author = 'DEV Agent') {
  console.log('🔍 [1/4] Đang quét hệ sinh thái workspace...');
  const scan = scanWorkspace(rootDir);

  console.log('📸 [2/4] Đang ghi nhận Snapshot Memory mới...');
  const { snapshot, snapshots } = createSnapshot(rootDir, { message, author });

  console.log('🔄 [3/4] Đang đồng bộ hóa .agents/STATE.md...');
  syncStateFile(rootDir, scan, message);

  console.log('📊 [4/4] Đang xuất Dashboard HTML...');
  const { htmlPath1 } = exportDashboard(rootDir, snapshots, scan);

  console.log(`\n✅ Hoàn tất lưu ký ức dự án:`);
  console.log(`- Checkpoint ID: ${snapshot.id}`);
  console.log(`- Thông điệp: "${snapshot.message}"`);
  console.log(`- Dashboard: ${htmlPath1}`);
  return { snapshot, scan, snapshots };
}

/**
 * CLI Handler
 */
async function main() {
  const args = process.argv.slice(2);
  const rootDir = findProjectRoot();

  if (args.includes('--scan')) {
    const scan = scanWorkspace(rootDir);
    console.log(JSON.stringify(scan, null, 2));
    return;
  }

  if (args.includes('--status')) {
    const scan = scanWorkspace(rootDir);
    const snapshots = loadSnapshots(rootDir);
    console.log(`===========================================`);
    console.log(`🧠 SYSTEM MEMORY STATUS: ${scan.projectName}`);
    console.log(`- Tổng số Snapshots: ${snapshots.length}`);
    console.log(`- Runtime: ${scan.techStack.runtime} (${scan.techStack.platform})`);
    console.log(`- Skills: ${scan.agentsStats.skillsCount} | Workflows: ${scan.agentsStats.workflowsCount} | Rules: ${scan.agentsStats.rulesCount}`);
    console.log(`- Nhánh Git: ${scan.git.branch} (${scan.git.modifiedFilesCount} files modified)`);
    console.log(`===========================================`);
    return;
  }

  if (args.includes('--export-html')) {
    const scan = scanWorkspace(rootDir);
    const snapshots = loadSnapshots(rootDir);
    const { htmlPath1 } = exportDashboard(rootDir, snapshots, scan);
    console.log(`✅ Đã xuất Dashboard HTML: ${htmlPath1}`);
    return;
  }

  if (args.includes('--sync-state')) {
    const scan = scanWorkspace(rootDir);
    syncStateFile(rootDir, scan, 'Đồng bộ trạng thái thủ công');
    console.log(`✅ Đã đồng bộ .agents/STATE.md thành công.`);
    return;
  }

  let message = 'Cập nhật trạng thái hệ thống';
  const snapIndex = args.indexOf('--snapshot');
  if (snapIndex !== -1 && args[snapIndex + 1]) {
    message = args[snapIndex + 1];
  } else if (args[0] && !args[0].startsWith('--')) {
    message = args.join(' ');
  }

  await runAutoPipeline(rootDir, message);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
