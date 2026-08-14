/**
 * Trình tạo Dashboard HTML cho System Memories
 */
export function generateMemoryDashboardHtml(snapshots = [], currentScan = {}) {
  const totalSnapshots = snapshots.length;
  const lastSnapshot = snapshots[snapshots.length - 1] || null;
  const lastTime = lastSnapshot ? new Date(lastSnapshot.timestamp).toLocaleString('vi-VN') : 'Chưa có dữ liệu';

  const skillsList = currentScan.agentsStats?.skillsList || [];
  const rulesList = currentScan.agentsStats?.rulesList || [];
  const workflowsList = currentScan.agentsStats?.workflowsList || [];

  // Tạo các item timeline từ snapshots đảo ngược (mới nhất lên đầu)
  const timelineItems = [...snapshots].reverse().map((snap, idx) => {
    const timeFormatted = new Date(snap.timestamp).toLocaleString('vi-VN');
    const authorBadge = snap.author || 'SYSTEM';
    const actionBadge = snap.triggerAction || 'checkpoint';
    const modifiedCount = snap.git?.modifiedFilesCount || 0;
    
    return `
      <div class="timeline-item" data-search="${(snap.message + ' ' + authorBadge + ' ' + actionBadge).toLowerCase()}">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="card-header">
            <div class="card-title-group">
              <span class="badge badge-author">${escapeHtml(authorBadge)}</span>
              <span class="badge badge-action">${escapeHtml(actionBadge)}</span>
              <span class="checkpoint-id">#${snap.id || ('M-' + (totalSnapshots - idx))}</span>
            </div>
            <span class="timestamp">${timeFormatted}</span>
          </div>
          <div class="card-body">
            <p class="memory-message">${escapeHtml(snap.message || 'Lưu trạng thái hệ thống')}</p>
            <div class="meta-row">
              <span class="meta-tag">🌿 Git: <strong>${escapeHtml(snap.git?.branch || 'main')}</strong></span>
              ${snap.git?.lastCommitHash ? `<span class="meta-tag">🔗 Commit: <code>${escapeHtml(snap.git.lastCommitHash)}</code></span>` : ''}
              <span class="meta-tag">📁 Modified: <strong>${modifiedCount} files</strong></span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('\n');

  const skillsGrid = skillsList.map(skill => `
    <div class="skill-card">
      <div class="skill-icon">🧩</div>
      <div class="skill-info">
        <div class="skill-name">${escapeHtml(skill)}</div>
        <div class="skill-badge">Active Skill</div>
      </div>
    </div>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>System Memories & Architecture Dashboard - ${escapeHtml(currentScan.projectName || 'Project')}</title>
  <style>
    :root {
      --bg-dark: #090d16;
      --bg-card: #111827;
      --bg-card-hover: #1f293d;
      --border-color: #1e293b;
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --accent-cyan: #06b6d4;
      --accent-purple: #a855f7;
      --accent-emerald: #10b981;
      --accent-amber: #f59e0b;
      --accent-rose: #f43f5e;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-dark);
      color: var(--text-main);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      padding: 2rem 1.5rem;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
    }

    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.5rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid var(--border-color);
      margin-bottom: 2rem;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .header-icon {
      font-size: 2.8rem;
      background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2));
      padding: 0.8rem;
      border-radius: 16px;
      border: 1px solid rgba(6, 182, 212, 0.3);
    }

    .title-group h1 {
      font-size: 1.8rem;
      font-weight: 700;
      background: linear-gradient(135deg, #fff, #94a3b8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .title-group p {
      color: var(--text-muted);
      font-size: 0.95rem;
    }

    .header-badges {
      display: flex;
      gap: 0.8rem;
      align-items: center;
    }

    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(16, 185, 129, 0.1);
      color: var(--accent-emerald);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 0.4rem 0.9rem;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 600;
    }

    .pulse {
      width: 8px;
      height: 8px;
      background-color: var(--accent-emerald);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--accent-emerald);
    }

    /* KPI Grid */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.2rem;
      margin-bottom: 2.5rem;
    }

    .kpi-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      padding: 1.4rem;
      position: relative;
      overflow: hidden;
      transition: transform 0.2s, border-color 0.2s;
    }

    .kpi-card:hover {
      transform: translateY(-2px);
      border-color: rgba(6, 182, 212, 0.4);
    }

    .kpi-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple));
    }

    .kpi-label {
      color: var(--text-muted);
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .kpi-value {
      font-size: 2rem;
      font-weight: 700;
      color: #fff;
    }

    .kpi-sub {
      color: var(--accent-cyan);
      font-size: 0.85rem;
      margin-top: 0.3rem;
    }

    /* Layout Grid */
    .layout-grid {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 2rem;
    }

    @media (max-width: 1024px) {
      .layout-grid {
        grid-template-columns: 1fr;
      }
    }

    /* Section Styles */
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .section-title {
      font-size: 1.3rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .search-input {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
      min-width: 260px;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--accent-cyan);
    }

    /* Timeline */
    .timeline {
      position: relative;
      padding-left: 2rem;
      border-left: 2px solid var(--border-color);
    }

    .timeline-item {
      position: relative;
      margin-bottom: 1.8rem;
    }

    .timeline-dot {
      position: absolute;
      left: -2.45rem;
      top: 1.2rem;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--accent-cyan);
      border: 3px solid var(--bg-dark);
      box-shadow: 0 0 10px rgba(6, 182, 212, 0.6);
    }

    .timeline-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.2rem;
      transition: all 0.2s;
    }

    .timeline-card:hover {
      background: var(--bg-card-hover);
      border-color: rgba(6, 182, 212, 0.3);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.8rem;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .card-title-group {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .badge {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.2rem 0.6rem;
      border-radius: 6px;
      text-transform: uppercase;
    }

    .badge-author {
      background: rgba(168, 85, 247, 0.15);
      color: var(--accent-purple);
      border: 1px solid rgba(168, 85, 247, 0.3);
    }

    .badge-action {
      background: rgba(6, 182, 212, 0.15);
      color: var(--accent-cyan);
      border: 1px solid rgba(6, 182, 212, 0.3);
    }

    .checkpoint-id {
      color: var(--text-muted);
      font-family: var(--font-mono);
      font-size: 0.8rem;
    }

    .timestamp {
      color: var(--text-muted);
      font-size: 0.85rem;
    }

    .memory-message {
      font-size: 1rem;
      font-weight: 500;
      color: #fff;
      margin-bottom: 0.8rem;
    }

    .meta-row {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .meta-tag code {
      background: rgba(255, 255, 255, 0.06);
      padding: 0.1rem 0.4rem;
      border-radius: 4px;
      font-family: var(--font-mono);
      color: var(--accent-cyan);
    }

    /* Sidebar cards */
    .sidebar-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.4rem;
      margin-bottom: 1.5rem;
    }

    .sidebar-card h3 {
      font-size: 1.1rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.6rem;
    }

    .skill-card {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 0.6rem 0.8rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border-color);
      border-radius: 8px;
    }

    .skill-icon {
      font-size: 1.2rem;
    }

    .skill-name {
      font-weight: 600;
      font-size: 0.9rem;
    }

    .skill-badge {
      font-size: 0.75rem;
      color: var(--accent-emerald);
    }

    .footer {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-color);
      text-align: center;
      color: var(--text-muted);
      font-size: 0.85rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <header class="header">
      <div class="header-left">
        <div class="header-icon">🧠</div>
        <div class="title-group">
          <h1>Hệ Thống Ký Ức Dự Án (System Memories)</h1>
          <p>Long-Term Project State & Architecture Checkpoints — <strong>${escapeHtml(currentScan.projectName || 'Dự án')}</strong></p>
        </div>
      </div>
      <div class="header-badges">
        <div class="status-pill">
          <div class="pulse"></div>
          <span>Active State Synced</span>
        </div>
      </div>
    </header>

    <!-- KPI Cards -->
    <section class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-label">Tổng Checkpoints</div>
        <div class="kpi-value">${totalSnapshots}</div>
        <div class="kpi-sub">Lần cập nhật gần nhất: ${lastTime}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Multi-Agent Skills</div>
        <div class="kpi-value">${skillsList.length}</div>
        <div class="kpi-sub">${skillsList.length} kỹ năng đã kích hoạt</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Workflows & Rules</div>
        <div class="kpi-value">${workflowsList.length + rulesList.length}</div>
        <div class="kpi-sub">${workflowsList.length} workflows / ${rulesList.length} rules</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Nhánh Git Hiện Tại</div>
        <div class="kpi-value" style="font-size: 1.4rem; padding-top: 0.3rem;">${escapeHtml(currentScan.git?.branch || 'main')}</div>
        <div class="kpi-sub">${currentScan.git?.modifiedFilesCount || 0} files đang thay đổi</div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="layout-grid">
      <!-- Left Column: Memory Timeline -->
      <main>
        <div class="section-header">
          <h2 class="section-title">🕒 Dòng Thời Gian Ký Ức (Memory Timeline)</h2>
          <input type="text" id="searchInput" class="search-input" placeholder="🔍 Tìm kiếm snapshot, vai trò, ghi chú...">
        </div>

        <div class="timeline" id="timelineList">
          ${timelineItems || '<p style="color: var(--text-muted); padding: 1rem 0;">Chưa có checkpoint nào được ghi nhận.</p>'}
        </div>
      </main>

      <!-- Right Column: System Sidebar -->
      <aside>
        <div class="sidebar-card">
          <h3>🧩 Ecosystem Skills</h3>
          <div class="skills-grid">
            ${skillsGrid}
          </div>
        </div>

        <div class="sidebar-card">
          <h3>⚙️ Tech Stack Summary</h3>
          <p style="font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--text-muted);">
            <strong>Runtime:</strong> ${escapeHtml(currentScan.techStack?.runtime || 'Node.js')}
          </p>
          <p style="font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--text-muted);">
            <strong>Platform:</strong> ${escapeHtml(currentScan.techStack?.platform || 'linux')}
          </p>
          <p style="font-size: 0.9rem; color: var(--text-muted);">
            <strong>STATE.md:</strong> <span style="color: var(--accent-emerald); font-weight: 600;">✓ Đồng bộ tự động</span>
          </p>
        </div>
      </aside>
    </div>

    <footer class="footer">
      <p>Antigravity Multi-Agent Memory System (MMS-001) • Tự động cập nhật qua workflow /dev, /fix</p>
    </footer>
  </div>

  <script>
    const searchInput = document.getElementById('searchInput');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        timelineItems.forEach(item => {
          const searchData = item.getAttribute('data-search') || '';
          if (!query || searchData.includes(query)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    }
  </script>
</body>
</html>`;
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
