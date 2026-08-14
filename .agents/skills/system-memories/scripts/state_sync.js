import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Đồng bộ hóa dữ liệu từ Snapshot/Scan vào .agents/STATE.md
 */
export function syncStateFile(rootDir, scanData, snapshotMessage = '') {
  const statePath = path.join(rootDir, '.agents', 'STATE.md');
  if (!existsSync(statePath)) {
    return false;
  }

  let content = readFileSync(statePath, 'utf8');

  // 1. Cập nhật Core Directories trong mục 3
  const coreDirsList = scanData.coreDirectories
    .map(dir => `- \`${dir.name}/\`: Chứa ${dir.childrenCount} mục/file cốt lõi.`)
    .join('\n');

  // Thay thế danh sách thư mục nếu có
  if (coreDirsList && content.includes('## 3. CẤU TRÚC THƯ MỤC CỐT LÕI (CORE DIRECTORIES)')) {
    const dirHeader = '## 3. CẤU TRÚC THƯ MỤC CỐT LÕI (CORE DIRECTORIES)\n*(Ghi chú các thư mục quan trọng để AI biết nên xem code ở đâu)*\n';
    const nextSectionRegex = /\n## 4\. BẢO MẬT & QUYỀN TRUY CẬP/;
    const nextMatch = content.match(nextSectionRegex);
    if (nextMatch) {
      const startIndex = content.indexOf(dirHeader);
      const endIndex = content.indexOf(nextMatch[0]);
      if (startIndex !== -1 && endIndex > startIndex) {
        const replacement = `${dirHeader}${coreDirsList}\n`;
        content = content.slice(0, startIndex) + replacement + content.slice(endIndex);
      }
    }
  }

  // 2. Cập nhật Technology Stack trong mục 2
  const techStackInfo = [
    `- **Runtime / Engine**: \`${scanData.techStack.runtime} (${scanData.techStack.platform})\``,
    `- **Gói chính**: \`${scanData.projectName} v${scanData.version}\``,
    `- **Skills Multi-Agent**: \`${scanData.agentsStats.skillsCount} skills tích hợp\``,
    `- **Workflows**: \`${scanData.agentsStats.workflowsCount} workflows tự động\``
  ].join('\n');

  if (content.includes('## 2. TECHNOLOGY STACK (NGĂN XẾP CÔNG NGHỆ)')) {
    const techHeader = '## 2. TECHNOLOGY STACK (NGĂN XẾP CÔNG NGHỆ)\n';
    const nextSectionRegex = /\n## 3\. CẤU TRÚC THƯ MỤC CỐT LÕI/;
    const nextMatch = content.match(nextSectionRegex);
    if (nextMatch) {
      const startIndex = content.indexOf(techHeader);
      const endIndex = content.indexOf(nextMatch[0]);
      if (startIndex !== -1 && endIndex > startIndex) {
        const replacement = `${techHeader}${techStackInfo}\n`;
        content = content.slice(0, startIndex) + replacement + content.slice(endIndex);
      }
    }
  }

  // 3. Cập nhật Last Action trong mục 5
  const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  const lastActionText = `- **Nhánh / Phiên bản hiện tại**: \`${scanData.git.branch || 'main'}\` (Commit: \`${scanData.git.lastCommitHash || 'initial'}\`)\n- **Hành động gần nhất (System Memory Checkpoint)**: \`${snapshotMessage || 'Cập nhật trạng thái hệ thống'}\` [${timestamp}]`;

  if (content.includes('## 5. NỢ KỸ THUẬT & TRẠNG THÁI CUỐI (TECH DEBTS & LAST ACTION)')) {
    const debtHeader = '## 5. NỢ KỸ THUẬT & TRẠNG THÁI CUỐI (TECH DEBTS & LAST ACTION)\n';
    const nextSectionRegex = /\n## 6\. SƠ ĐỒ NGỮ NGHĨA/;
    const nextMatch = content.match(nextSectionRegex);
    if (nextMatch) {
      const startIndex = content.indexOf(debtHeader);
      const endIndex = content.indexOf(nextMatch[0]);
      if (startIndex !== -1 && endIndex > startIndex) {
        const replacement = `${debtHeader}${lastActionText}\n- **Nợ kỹ thuật cần xử lý (Tech Debt)**: \`[Không có blocker nghiêm trọng]\`\n- **Blockers hiện hành**: \`[None]\`\n`;
        content = content.slice(0, startIndex) + replacement + content.slice(endIndex);
      }
    }
  }

  writeFileSync(statePath, content, 'utf8');
  return true;
}
