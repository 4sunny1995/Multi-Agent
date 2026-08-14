import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, rmSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { scanWorkspace, findProjectRoot, getGitInfo } from '../scripts/scanner.js';
import { syncStateFile } from '../scripts/state_sync.js';
import { generateMemoryDashboardHtml } from '../scripts/html_generator.js';
import { loadSnapshots, saveSnapshots, createSnapshot, exportDashboard, runAutoPipeline } from '../scripts/memorize.js';

const tempTestDir = path.resolve('tmp-memory-test');

function setupTempWorkspace() {
  if (existsSync(tempTestDir)) {
    rmSync(tempTestDir, { recursive: true, force: true });
  }
  mkdirSync(tempTestDir, { recursive: true });
  mkdirSync(path.join(tempTestDir, '.agents', 'rules'), { recursive: true });
  mkdirSync(path.join(tempTestDir, '.agents', 'skills'), { recursive: true });
  mkdirSync(path.join(tempTestDir, '.agents', 'workflows'), { recursive: true });
  mkdirSync(path.join(tempTestDir, 'docs', 'original'), { recursive: true });

  // Tạo file package.json giả lập
  writeFileSync(path.join(tempTestDir, 'package.json'), JSON.stringify({
    name: 'test-project',
    version: '1.2.3',
    dependencies: { express: '^4.18.0' },
    devDependencies: { mocha: '^10.0.0' }
  }), 'utf8');

  // Tạo file STATE.md giả lập
  const sampleState = `# 🧠 Antigravity Project State Checkpoint

## 2. TECHNOLOGY STACK (NGĂN XẾP CÔNG NGHỆ)
- **Frontend**: [None]

## 3. CẤU TRÚC THƯ MỤC CỐT LÕI (CORE DIRECTORIES)
- [None]

## 4. BẢO MẬT & QUYỀN TRUY CẬP (SECURITY PROTOCOL)
- [External Secret]

## 5. NỢ KỸ THUẬT & TRẠNG THÁI CUỐI (TECH DEBTS & LAST ACTION)
- **Nhánh / Phiên bản hiện tại**: [Init]

## 6. SƠ ĐỒ NGỮ NGHĨA (SEMANTIC KNOWLEDGE MAP)
`;
  writeFileSync(path.join(tempTestDir, '.agents', 'STATE.md'), sampleState, 'utf8');
}

function teardownTempWorkspace() {
  if (existsSync(tempTestDir)) {
    rmSync(tempTestDir, { recursive: true, force: true });
  }
}

test('scanner detects workspace metadata and tech stack', () => {
  setupTempWorkspace();
  const scan = scanWorkspace(tempTestDir);
  assert.equal(scan.projectName, 'test-project');
  assert.equal(scan.version, '1.2.3');
  assert.equal(scan.hasStateFile, true);
  assert.ok(Array.isArray(scan.coreDirectories));
  assert.ok(scan.techStack.directDependencies.includes('express'));
  teardownTempWorkspace();
});

test('creates, saves and loads snapshots correctly', () => {
  setupTempWorkspace();
  const { snapshot, snapshots } = createSnapshot(tempTestDir, {
    message: 'Test snapshot creation',
    author: 'TEST_AGENT'
  });

  assert.ok(snapshot.id.startsWith('mem-'));
  assert.equal(snapshot.author, 'TEST_AGENT');
  assert.equal(snapshot.message, 'Test snapshot creation');
  assert.equal(snapshots.length, 1);

  const loaded = loadSnapshots(tempTestDir);
  assert.equal(loaded.length, 1);
  assert.equal(loaded[0].id, snapshot.id);

  // Thêm snapshot thứ 2
  const { snapshots: secondBatch } = createSnapshot(tempTestDir, {
    message: 'Second checkpoint',
    author: 'DEV_AGENT'
  });
  assert.equal(secondBatch.length, 2);

  teardownTempWorkspace();
});

test('synchronizes scan data into STATE.md without breaking sections', () => {
  setupTempWorkspace();
  const scan = scanWorkspace(tempTestDir);
  const ok = syncStateFile(tempTestDir, scan, 'Update test feature');
  assert.equal(ok, true);

  const updatedState = readFileSync(path.join(tempTestDir, '.agents', 'STATE.md'), 'utf8');
  assert.match(updatedState, /Runtime \/ Engine/);
  assert.match(updatedState, /test-project v1\.2\.3/);
  assert.match(updatedState, /Update test feature/);
  assert.match(updatedState, /BẢO MẬT & QUYỀN TRUY CẬP/);
  assert.match(updatedState, /SƠ ĐỒ NGỮ NGHĨA/);

  teardownTempWorkspace();
});

test('generates interactive HTML dashboard with timeline and KPIs', () => {
  const sampleScan = {
    projectName: 'DemoApp',
    techStack: { runtime: 'Node.js v24.0.0', platform: 'linux' },
    agentsStats: { skillsList: ['token-tracker', 'system-memories'], rulesList: ['rule-1'], workflowsList: ['dev'] },
    git: { branch: 'feature/memories', modifiedFilesCount: 2 }
  };
  const sampleSnapshots = [
    {
      id: 'mem-123',
      timestamp: '2026-08-14T16:00:00Z',
      author: 'BA Agent',
      triggerAction: 'workflow:dev',
      message: 'Created BRD Draft',
      git: { branch: 'main', modifiedFilesCount: 1 }
    }
  ];

  const html = generateMemoryDashboardHtml(sampleSnapshots, sampleScan);
  assert.match(html, /<!DOCTYPE html>/);
  assert.match(html, /Hệ Thống Ký Ức Dự Án/);
  assert.match(html, /DemoApp/);
  assert.match(html, /Created BRD Draft/);
  assert.match(html, /token-tracker/);
});

test('runs auto pipeline end-to-end smoothly', async () => {
  setupTempWorkspace();
  const result = await runAutoPipeline(tempTestDir, 'End-to-end integration test');
  assert.ok(result.snapshot);
  assert.equal(existsSync(path.join(tempTestDir, '.agents', 'memories', 'snapshots.json')), true);
  assert.equal(existsSync(path.join(tempTestDir, '.agents', 'memories', 'memories_dashboard.html')), true);
  assert.equal(existsSync(path.join(tempTestDir, 'docs', 'original', 'metrics', 'system_memories.html')), true);
  teardownTempWorkspace();
});
