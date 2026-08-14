import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

/**
 * Tìm thư mục gốc dự án (project root)
 */
export function findProjectRoot(startDir = process.cwd()) {
  let current = path.resolve(startDir);
  while (current && current !== '/') {
    if (existsSync(path.join(current, '.agents')) || existsSync(path.join(current, 'package.json')) || existsSync(path.join(current, '.git'))) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return process.cwd();
}

/**
 * Lấy thông tin Git an toàn
 */
export function getGitInfo(rootDir) {
  const result = {
    isGitRepo: false,
    branch: 'unknown',
    lastCommitHash: '',
    lastCommitMessage: '',
    lastCommitDate: '',
    modifiedFilesCount: 0,
    modifiedFiles: []
  };

  try {
    if (!existsSync(path.join(rootDir, '.git'))) {
      return result;
    }

    result.isGitRepo = true;
    result.branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: rootDir, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    result.lastCommitHash = execSync('git log -1 --format=%h', { cwd: rootDir, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    result.lastCommitMessage = execSync('git log -1 --format=%s', { cwd: rootDir, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    result.lastCommitDate = execSync('git log -1 --format=%cd --date=iso', { cwd: rootDir, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();

    const statusOutput = execSync('git status --porcelain', { cwd: rootDir, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    if (statusOutput) {
      const lines = statusOutput.split('\n').filter(Boolean);
      result.modifiedFilesCount = lines.length;
      result.modifiedFiles = lines.slice(0, 15).map(line => line.trim());
    }
  } catch (err) {
    // Git command fail or git not installed - keep fallback values
  }

  return result;
}

/**
 * Đếm số lượng files và thư mục con
 */
function safeCountDir(dirPath) {
  if (!existsSync(dirPath)) return 0;
  try {
    return readdirSync(dirPath).filter(name => !name.startsWith('.')).length;
  } catch {
    return 0;
  }
}

/**
 * Quét toàn bộ thông tin kiến trúc và hệ thống dự án
 */
export function scanWorkspace(rootDir = findProjectRoot()) {
  const root = path.resolve(rootDir);
  const git = getGitInfo(root);

  // 1. Phân tích Package.json (nếu có)
  const pkgPath = path.join(root, 'package.json');
  let pkgInfo = { name: path.basename(root), version: '1.0.0', dependencies: {}, devDependencies: {} };
  if (existsSync(pkgPath)) {
    try {
      pkgInfo = JSON.parse(readFileSync(pkgPath, 'utf8'));
    } catch {
      // JSON parse fallback
    }
  }

  // 2. Thống kê hệ sinh thái .agents
  const agentsDir = path.join(root, '.agents');
  const skillsDir = path.join(agentsDir, 'skills');
  const rulesDir = path.join(agentsDir, 'rules');
  const workflowsDir = path.join(agentsDir, 'workflows');
  const docsDir = path.join(root, 'docs');

  const skills = existsSync(skillsDir) ? readdirSync(skillsDir).filter(name => !name.startsWith('.')) : [];
  const rules = existsSync(rulesDir) ? readdirSync(rulesDir).filter(f => f.endsWith('.md')) : [];
  const workflows = existsSync(workflowsDir) ? readdirSync(workflowsDir).filter(f => f.endsWith('.md')) : [];

  // 3. Quét các thư mục cốt lõi
  const coreDirs = [];
  try {
    const rootItems = readdirSync(root);
    for (const item of rootItems) {
      if (item.startsWith('.') && item !== '.agents') continue;
      if (item === 'node_modules') continue;
      const fullPath = path.join(root, item);
      try {
        const isDirectory = statSync(fullPath).isDirectory();
        if (isDirectory) {
          coreDirs.push({
            name: item,
            path: item + '/',
            childrenCount: safeCountDir(fullPath)
          });
        }
      } catch {}
    }
  } catch {}

  // 4. Nhận diện Tech Stack
  const techStack = {
    runtime: `Node.js ${process.version}`,
    platform: process.platform,
    mainPackage: pkgInfo.name || path.basename(root),
    version: pkgInfo.version || '1.0.0',
    directDependencies: Object.keys(pkgInfo.dependencies || {}),
    devDependencies: Object.keys(pkgInfo.devDependencies || {})
  };

  return {
    scannedAt: new Date().toISOString(),
    rootPath: root,
    projectName: pkgInfo.name || path.basename(root),
    version: pkgInfo.version || '1.0.0',
    git,
    techStack,
    agentsStats: {
      skillsCount: skills.length,
      skillsList: skills,
      rulesCount: rules.length,
      rulesList: rules,
      workflowsCount: workflows.length,
      workflowsList: workflows
    },
    coreDirectories: coreDirs,
    hasStateFile: existsSync(path.join(agentsDir, 'STATE.md'))
  };
}
