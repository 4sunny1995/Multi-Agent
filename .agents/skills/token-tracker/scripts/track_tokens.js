import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import path from 'path';

function estimateTokens(text) {
    if (!text) return 0;
    if (typeof text !== 'string') text = JSON.stringify(text);
    // Công thức ước tính an toàn cho văn bản đa ngôn ngữ (Việt - Anh - Code)
    const hasUnicode = /[^\x00-\x7F]/.test(text);
    const ratio = hasUnicode ? 2.0 : 3.5;
    return Math.ceil(text.length / ratio);
}

function detectAgentRole(stepContent, defaultRole = 'AI Assistant') {
    if (!stepContent) return defaultRole;
    const str = typeof stepContent === 'string' ? stepContent : JSON.stringify(stepContent);

    if (/BA\s+Agent|Business\s+Analyst|Khai\s+phá\s+Yêu\s+cầu/i.test(str)) return 'BA Agent';
    if (/SA\s+Agent|System\s+Architect|Kiến\s+trúc\s+sư/i.test(str)) return 'SA Agent';
    if (/DESIGNER|Designer\s+Agent|Thiết\s+kế\s+UI/i.test(str)) return 'Designer Agent';
    if (/DEV\s+Agent|Developer|Lập\s+trình\s+viên/i.test(str)) return 'DEV Agent';
    if (/TESTER|QA\s+Agent|Kiểm\s+thử/i.test(str)) return 'Tester Agent';
    if (/TECH\s+WRITER|Tech\s+Writer\s+Agent|Báo\s+cáo\s+Kỹ\s+thuật/i.test(str)) return 'Tech Writer Agent';
    if (/LEADER|CTO|Gatekeeper/i.test(str)) return 'Leader Agent';
    if (/SECURITY|Security\s+Agent|Bảo\s+mật/i.test(str)) return 'Security Agent';
    if (/AUDITOR|Auditor\s+Agent|Thẩm\s+định/i.test(str)) return 'Auditor Agent';

    return defaultRole;
}

function findLatestTranscriptFile() {
    // 1. Kiểm tra qua đối số CLI --log <path>
    const args = process.argv.slice(2);
    const logIdx = args.indexOf('--log');
    if (logIdx !== -1 && args[logIdx + 1] && existsSync(args[logIdx + 1])) {
        return args[logIdx + 1];
    }

    // 2. Tìm trong thư mục brain mặc định của appData
    const homeDir = process.env.HOME || process.env.USERPROFILE || '';
    const appDataBrain = path.join(homeDir, '.gemini/antigravity-ide/brain');

    if (existsSync(appDataBrain)) {
        try {
            const sessions = readdirSync(appDataBrain).filter(s => statSync(path.join(appDataBrain, s)).isDirectory());
            let latestLog = null;
            let latestTime = 0;

            for (const s of sessions) {
                const logPath = path.join(appDataBrain, s, '.system_generated/logs/transcript.jsonl');
                if (existsSync(logPath)) {
                    const stats = statSync(logPath);
                    if (stats.mtimeMs > latestTime) {
                        latestTime = stats.mtimeMs;
                        latestLog = logPath;
                    }
                }
            }
            if (latestLog) return latestLog;
        } catch (e) {}
    }

    return null;
}

export function parseTranscriptMetrics(transcriptFilePath) {
    if (!transcriptFilePath || !existsSync(transcriptFilePath)) {
        console.log('⚠️ Không tìm thấy file transcript.jsonl. Tạo chỉ số mẫu.');
        return {
            sessionId: 'current-session',
            totalTurns: 1,
            participatingAgents: ['AI Assistant'],
            totalInputTokens: 0,
            totalOutputTokens: 0,
            totalTokens: 0,
            turns: []
        };
    }

    const lines = readFileSync(transcriptFilePath, 'utf8').split('\n').filter(Boolean);
    const turns = [];

    let currentTurnNumber = 0;
    let totalInputTokens = 0;
    let totalOutputTokens = 0;

    for (const line of lines) {
        try {
            const entry = JSON.parse(line);
            const type = entry.type || '';
            const source = entry.source || '';
            const content = entry.content || '';
            const toolCalls = entry.tool_calls || [];
            const timestamp = entry.timestamp ? new Date(entry.timestamp).toLocaleTimeString() : new Date().toLocaleTimeString();

            if (type === 'USER_INPUT') {
                currentTurnNumber++;
                const inputTokens = estimateTokens(content);
                totalInputTokens += inputTokens;

                turns.push({
                    turn: currentTurnNumber,
                    type: 'USER_INPUT',
                    agent: 'User',
                    action: 'User Request',
                    inputTokens,
                    outputTokens: 0,
                    totalTokens: inputTokens,
                    timestamp
                });
            } else if (type === 'PLANNER_RESPONSE' || source === 'MODEL') {
                const role = detectAgentRole(content);

                const outputTextTokens = estimateTokens(content);
                const toolCallsTokens = estimateTokens(toolCalls);
                const outputTokens = outputTextTokens + toolCallsTokens;
                const inputTokens = Math.ceil(outputTokens * 1.5); // Ước tính ngữ cảnh đã nạp

                totalInputTokens += inputTokens;
                totalOutputTokens += outputTokens;

                // Tóm tắt hành động
                let action = 'Phản hồi & Thực thi tác vụ';
                if (toolCalls && toolCalls.length > 0) {
                    const toolNames = toolCalls.map(t => t.name || t.toolAction || 'tool').slice(0, 2).join(', ');
                    action = `Thực thi công cụ: ${toolNames}`;
                } else if (typeof content === 'string' && content.length > 0) {
                    action = content.slice(0, 60).replace(/\n/g, ' ') + '...';
                }

                turns.push({
                    turn: currentTurnNumber || (turns.length + 1),
                    type: 'AGENT_RESPONSE',
                    agent: role,
                    action,
                    inputTokens,
                    outputTokens,
                    totalTokens: inputTokens + outputTokens,
                    timestamp
                });
            }
        } catch (e) {
            // Bỏ qua các dòng JSON lỗi
        }
    }

    // Chuẩn hóa tên Agent Role cho tất cả các bước thuộc cùng 1 Turn
    const turnRoleMap = new Map();
    turns.forEach(t => {
        if (t.agent && t.agent !== 'User' && t.agent !== 'AI Assistant') {
            turnRoleMap.set(t.turn, t.agent);
        }
    });

    const agentsSet = new Set();
    turns.forEach(t => {
        if (t.agent === 'AI Assistant' && turnRoleMap.has(t.turn)) {
            t.agent = turnRoleMap.get(t.turn);
        }
        if (t.agent && t.agent !== 'User') {
            agentsSet.add(t.agent);
        }
    });

    const participatingAgents = Array.from(agentsSet);
    if (participatingAgents.length === 0) participatingAgents.push('AI Assistant');

    const result = {
        sessionId: path.basename(path.resolve(transcriptFilePath, '../../..')),
        totalTurns: turns.length,
        participatingAgents,
        totalInputTokens,
        totalOutputTokens,
        totalTokens: totalInputTokens + totalOutputTokens,
        turns
    };

    return result;
}

function getAgentBadgeClass(agentName) {
    if (!agentName) return 'badge-default';
    if (agentName === 'User') return 'badge-user';
    if (agentName.includes('BA')) return 'badge-ba';
    if (agentName.includes('SA')) return 'badge-sa';
    if (agentName.includes('DEV') || agentName.includes('Developer')) return 'badge-dev';
    if (agentName.includes('Tester') || agentName.includes('QA')) return 'badge-tester';
    if (agentName.includes('Leader') || agentName.includes('CTO')) return 'badge-leader';
    if (agentName.includes('Security')) return 'badge-security';
    return 'badge-default';
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function generateHtmlDashboard(metrics) {
    const totalIn = metrics.totalInputTokens.toLocaleString();
    const totalOut = metrics.totalOutputTokens.toLocaleString();
    const totalAll = metrics.totalTokens.toLocaleString();

    const agentStats = {};
    metrics.turns.forEach(t => {
        const agent = t.agent || 'Unknown';
        if (!agentStats[agent]) {
            agentStats[agent] = { turns: 0, inputTokens: 0, outputTokens: 0, totalTokens: 0 };
        }
        agentStats[agent].turns += 1;
        agentStats[agent].inputTokens += (t.inputTokens || 0);
        agentStats[agent].outputTokens += (t.outputTokens || 0);
        agentStats[agent].totalTokens += (t.totalTokens || 0);
    });

    const agentDistributionRows = Object.entries(agentStats).map(([agent, stat]) => {
        const pct = metrics.totalTokens > 0 ? ((stat.totalTokens / metrics.totalTokens) * 100).toFixed(1) : 0;
        return `
        <tr>
            <td><span class="agent-badge ${getAgentBadgeClass(agent)}">${agent}</span></td>
            <td><strong>${stat.turns}</strong> lượt</td>
            <td>${stat.inputTokens.toLocaleString()}</td>
            <td>${stat.outputTokens.toLocaleString()}</td>
            <td><strong>${stat.totalTokens.toLocaleString()}</strong></td>
            <td>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${pct}%"></div>
                    <span class="pct-text">${pct}%</span>
                </div>
            </td>
        </tr>
        `;
    }).join('');

    const tableRows = metrics.turns.map(t => {
        return `
        <tr class="turn-row" data-agent="${t.agent}">
            <td><span class="turn-badge">Turn ${t.turn}</span></td>
            <td><span class="agent-badge ${getAgentBadgeClass(t.agent)}">${t.agent}</span></td>
            <td class="action-cell" title="${escapeHtml(t.action)}">${escapeHtml(t.action)}</td>
            <td>${(t.inputTokens || 0).toLocaleString()}</td>
            <td>${(t.outputTokens || 0).toLocaleString()}</td>
            <td><strong>${(t.totalTokens || 0).toLocaleString()}</strong></td>
            <td class="time-cell">${t.timestamp || '--'}</td>
        </tr>
        `;
    }).join('');

    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📊 Token & Agent Interaction Dashboard - ${metrics.sessionId}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-dark: #0f172a;
            --bg-card: #1e293b;
            --bg-hover: #334155;
            --text-main: #f8fafc;
            --text-sub: #94a3b8;
            --accent-cyan: #38bdf8;
            --accent-purple: #a855f7;
            --accent-green: #22c55e;
            --border-color: #334155;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Inter', system-ui, sans-serif;
            background-color: var(--bg-dark);
            color: var(--text-main);
            padding: 2rem;
            line-height: 1.5;
        }
        .container {
            max-width: 1280px;
            margin: 0 auto;
        }
        header.dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border-color);
        }
        .title-group h1 {
            font-size: 1.85rem;
            font-weight: 800;
            background: linear-gradient(135deg, #38bdf8, #a855f7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .subtitle { color: var(--text-sub); font-size: 0.9rem; margin-top: 0.2rem; }
        .session-tag {
            background: rgba(56, 189, 248, 0.1);
            border: 1px solid rgba(56, 189, 248, 0.3);
            color: var(--accent-cyan);
            padding: 0.4rem 0.85rem;
            border-radius: 999px;
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
        }

        /* KPI Cards Grid */
        .kpi-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.25rem;
            margin-bottom: 2rem;
        }
        .kpi-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 1.25rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .kpi-label { font-size: 0.8rem; text-transform: uppercase; color: var(--text-sub); font-weight: 600; }
        .kpi-value { font-size: 1.8rem; font-weight: 800; margin-top: 0.3rem; color: var(--text-main); }
        .kpi-subtext { font-size: 0.75rem; color: var(--text-sub); margin-top: 0.25rem; }

        /* Distribution Table */
        .section-title {
            font-size: 1.2rem;
            font-weight: 700;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .card-panel {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 2rem;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
        }
        th, td {
            padding: 0.75rem 1rem;
            text-align: left;
            border-bottom: 1px solid var(--border-color);
        }
        th {
            background: rgba(15, 23, 42, 0.6);
            color: var(--text-sub);
            font-weight: 600;
            font-size: 0.8rem;
            text-transform: uppercase;
        }
        tr:hover { background: rgba(255, 255, 255, 0.02); }

        /* Badges & Progress Bar */
        .agent-badge {
            display: inline-block;
            padding: 0.25rem 0.65rem;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        .badge-user { background: #334155; color: #f1f5f9; }
        .badge-ba { background: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.3); }
        .badge-sa { background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); }
        .badge-dev { background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); }
        .badge-tester { background: rgba(249, 115, 22, 0.15); color: #fb923c; border: 1px solid rgba(249, 115, 22, 0.3); }
        .badge-leader { background: rgba(234, 179, 8, 0.15); color: #facc15; border: 1px solid rgba(234, 179, 8, 0.3); }
        .badge-security { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }
        .badge-default { background: rgba(148, 163, 184, 0.15); color: #cbd5e1; }

        .turn-badge {
            font-family: 'Fira Code', monospace;
            font-size: 0.8rem;
            color: var(--text-sub);
        }
        .progress-bar-container {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .progress-bar-fill {
            height: 8px;
            background: linear-gradient(90deg, #38bdf8, #818cf8);
            border-radius: 999px;
            min-width: 4px;
        }
        .pct-text { font-size: 0.8rem; color: var(--text-sub); font-family: 'Fira Code', monospace; }

        /* Filter Controls */
        .filter-bar {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        .search-input {
            flex: 1;
            background: var(--bg-dark);
            border: 1px solid var(--border-color);
            padding: 0.6rem 1rem;
            border-radius: 8px;
            color: var(--text-main);
            font-size: 0.9rem;
        }
        .search-input:focus { outline: none; border-color: var(--accent-cyan); }
        .action-cell {
            max-width: 450px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .time-cell { font-family: 'Fira Code', monospace; font-size: 0.8rem; color: var(--text-sub); }
    </style>
</head>
<body>
    <div class="container">
        <header class="dashboard-header">
            <div class="title-group">
                <h1>📊 Token & Agent Interaction Dashboard</h1>
                <div class="subtitle">Báo cáo chỉ số tương tác và tài nguyên AI tiêu thụ chuẩn TTS-001</div>
            </div>
            <div class="session-tag">Session: ${metrics.sessionId}</div>
        </header>

        <!-- KPI Cards Grid -->
        <div class="kpi-grid">
            <div class="kpi-card">
                <div class="kpi-label">Tổng Token tiêu thụ</div>
                <div class="kpi-value" style="color: #38bdf8;">${totalAll}</div>
                <div class="kpi-subtext">Input: ${totalIn} | Output: ${totalOut}</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-label">Tổng số lượt tương tác</div>
                <div class="kpi-value" style="color: #a855f7;">${metrics.totalTurns}</div>
                <div class="kpi-subtext">Lượt trao đổi trong phiên</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-label">Số Agent tham gia</div>
                <div class="kpi-value" style="color: #22c55e;">${metrics.participatingAgents.length}</div>
                <div class="kpi-subtext">${metrics.participatingAgents.join(', ')}</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-label">Token trung bình / Turn</div>
                <div class="kpi-value" style="color: #facc15;">${metrics.totalTurns > 0 ? Math.round(metrics.totalTokens / metrics.totalTurns).toLocaleString() : 0}</div>
                <div class="kpi-subtext">Tokens / Lượt tương tác</div>
            </div>
        </div>

        <!-- Agent Breakdown Panel -->
        <div class="card-panel">
            <div class="section-title">🤖 Phân bổ Token theo Agent Role</div>
            <table>
                <thead>
                    <tr>
                        <th>Agent Role</th>
                        <th>Số Lượt (Turns)</th>
                        <th>Input Tokens</th>
                        <th>Output Tokens</th>
                        <th>Tổng Tokens</th>
                        <th>Tỷ lệ tiêu thụ (%)</th>
                    </tr>
                </thead>
                <tbody>
                    ${agentDistributionRows}
                </tbody>
            </table>
        </div>

        <!-- Detailed Turn Interaction Log -->
        <div class="card-panel">
            <div class="section-title">📜 Nhật ký chi tiết từng Turn giao tiếp (Interaction History)</div>
            <div class="filter-bar">
                <input type="text" id="searchInput" class="search-input" placeholder="🔍 Tìm kiếm theo Agent, hành động hoặc từ khóa..." onkeyup="filterTurns()">
            </div>
            <table id="turnsTable">
                <thead>
                    <tr>
                        <th>Lượt (#)</th>
                        <th>Agent Role</th>
                        <th>Hành động / Tác vụ chính</th>
                        <th>Input Tokens</th>
                        <th>Output Tokens</th>
                        <th>Total Tokens</th>
                        <th>Thời gian</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </div>
    </div>

    <script>
        function filterTurns() {
            const input = document.getElementById('searchInput').value.toLowerCase();
            const rows = document.querySelectorAll('#turnsTable tbody tr');
            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(input) ? '' : 'none';
            });
        }
    </script>
</body>
</html>
    `;
}

// Báo cáo trực quan Terminal
function renderMarkdownReport(metrics) {
    let md = `\n### 📊 Thống Kế Tương Tác Agent & Token Usage (TTS-001)\n\n`;
    md += `- **Phiên làm việc (Session ID)**: \`${metrics.sessionId}\`\n`;
    md += `- **Tổng số lượt tương tác**: \`${metrics.totalTurns}\` lượt\n`;
    md += `- **Các Agent đã tham gia**: \`${metrics.participatingAgents.join(', ')}\`\n\n`;
    md += `| Lượt (#) | Agent Role | Hành động / Tác vụ chính | Input Tokens | Output Tokens | Total Tokens | Thời gian |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

    metrics.turns.forEach(t => {
        const inTok = t.inputTokens ? t.inputTokens.toLocaleString() : '0';
        const outTok = t.outputTokens ? t.outputTokens.toLocaleString() : '0';
        const totTok = t.totalTokens ? t.totalTokens.toLocaleString() : '0';
        md += `| Turn ${t.turn} | ${t.agent} | ${t.action} | ${inTok} | ${outTok} | ${totTok} | ${t.timestamp} |\n`;
    });

    const totalIn = metrics.totalInputTokens.toLocaleString();
    const totalOut = metrics.totalOutputTokens.toLocaleString();
    const totalAll = metrics.totalTokens.toLocaleString();

    md += `| **TỔNG CỘNG** | **${metrics.participatingAgents.length} Agents** | **${metrics.totalTurns} Turns** | **${totalIn}** | **${totalOut}** | **${totalAll}** | -- |\n\n`;
    return md;
}

// Main execution
const logFile = findLatestTranscriptFile();
if (logFile) {
    console.log(`🔍 Đang phân tích log transcript: ${logFile}`);
    const metrics = parseTranscriptMetrics(logFile);
    const reportMd = renderMarkdownReport(metrics);

    console.log(reportMd);

    // 1. Lưu dữ liệu JSON vào .agents/metrics/token_metrics.json (TÍCH LŨY MULTI-SESSION)
    try {
        const metricsDir = path.resolve(process.cwd(), '.agents/metrics');
        if (!existsSync(metricsDir)) mkdirSync(metricsDir, { recursive: true });
        
        const jsonPath = path.join(metricsDir, 'token_metrics.json');
        let historyData = {
            lastUpdated: new Date().toISOString(),
            currentSessionId: metrics.sessionId,
            sessions: {}
        };

        if (existsSync(jsonPath)) {
            try {
                const existing = JSON.parse(readFileSync(jsonPath, 'utf8'));
                if (existing.sessions) {
                    historyData = existing;
                } else if (existing.sessionId) {
                    // Chuyển đổi định dạng đơn phiên cũ sang multi-session
                    historyData.sessions[existing.sessionId] = existing;
                }
            } catch (e) {}
        }

        historyData.lastUpdated = new Date().toISOString();
        historyData.currentSessionId = metrics.sessionId;
        historyData.sessions[metrics.sessionId] = metrics;

        writeFileSync(jsonPath, JSON.stringify(historyData, null, 2), 'utf8');
        console.log(`✅ Đã cập nhật & lưu tích lũy chỉ số token JSON vào: ${jsonPath}`);
    } catch (err) {
        console.error('Lỗi khi ghi file token_metrics.json:', err.message);
    }

    // 2. Tạo Dashboard HTML trực quan tại .agents/metrics/token_metrics.html & docs/original/metrics/token_metrics.html
    try {
        const htmlContent = generateHtmlDashboard(metrics);

        const metricsDir = path.resolve(process.cwd(), '.agents/metrics');
        if (!existsSync(metricsDir)) mkdirSync(metricsDir, { recursive: true });
        const htmlPath = path.join(metricsDir, 'token_metrics.html');
        writeFileSync(htmlPath, htmlContent, 'utf8');
        console.log(`🌐 Đã tạo Dashboard HTML xem trực tiếp tại: ${htmlPath}`);

        // Đồng bộ sang docs/original/metrics/token_metrics.html nếu thư mục docs/original tồn tại
        const docsMetricsDir = path.resolve(process.cwd(), 'docs/original/metrics');
        if (!existsSync(docsMetricsDir)) mkdirSync(docsMetricsDir, { recursive: true });
        const docsHtmlPath = path.join(docsMetricsDir, 'token_metrics.html');
        writeFileSync(docsHtmlPath, htmlContent, 'utf8');
        console.log(`🌐 Đã đồng bộ Dashboard HTML tới docs: ${docsHtmlPath}`);
    } catch (err) {
        console.error('Lỗi khi sinh file HTML Dashboard:', err.message);
    }

} else {
    console.log('⚠️ Chưa tìm thấy file transcript log nào để thống kê.');
}
