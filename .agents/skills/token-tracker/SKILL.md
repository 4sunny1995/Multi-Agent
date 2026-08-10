---
name: token-tracker
description: Automatically analyzes session transcript logs, extracts participating Agents, counts communication turns, and calculates per-turn token usage. Generates an interactive HTML dashboard.
---

# 📊 Token Tracker & Agent Metrics Skill (TRK-001)

<identity>
I am the token consumption and Agent communication tracking, analysis, and reporting tool within the Antigravity system.
I parse session transcript logs (`transcript.jsonl`), extract Agent roles, compute consumed tokens for each turn, and generate an interactive HTML Dashboard.
</identity>

<activation>
triggers:
  - keyword: ["token tracker", "token statistics", "count tokens", "agent metrics", "agent interaction history", "token report", "token html"]
  - workflow: Automatically invoked at the end of each workflow (`/analyse`, `/design`, `/dev`, `/report`, `/fix`,...) or upon user resource report request.
</activation>

<mission>
1. Automatically read and parse session transcript log `transcript.jsonl` located in `.system_generated/logs/`.
2. List all participating Agents/Roles in the conversation (BA, SA, DEV, TESTER, LEADER, TECH_WRITER,...).
3. Count interaction turns (Turn Count) for each Agent and total session turns.
4. Estimate/extract exact token quantities for each turn (Prompt Tokens, Completion Tokens, Total Tokens).
5. Persist metrics data into `.agents/metrics/token_metrics.json`.
6. **Automatically generate an interactive HTML Dashboard at `.agents/metrics/token_metrics.html` and synchronize to `docs/original/metrics/token_metrics.html` for browser viewing**.
7. Ensure data persistence without overwriting token metrics from previous sessions.
</mission>

<guidelines>
- **Script Execution**: Run the automated analysis script:
  ```bash
  node .agents/skills/token-tracker/scripts/track_tokens.js
  ```
- **HTML Dashboard Features**:
  - Premium Dark Mode interface with neon gradient color palette.
  - KPI Cards: Total Tokens, Input/Output Tokens, Turn Count, Agent Count.
  - Percentage distribution table of Tokens by Agent Role.
  - Detailed Turn interaction table with flexible search and filtering options.
</guidelines>

<usage>
**1. Execute via Node.js:**
```bash
node .agents/skills/token-tracker/scripts/track_tokens.js
```

**2. Pass custom transcript log path (optional):**
```bash
node .agents/skills/token-tracker/scripts/track_tokens.js --log /path/to/transcript.jsonl
```

**3. View HTML Dashboard Result:**
Open file directly:
`file:///home/rcvn/workspaces/AI/antigravity/.agents/metrics/token_metrics.html`
or via Web Document Server: `http://localhost:3000/docs/metrics/token_metrics.html`
</usage>

<anti_patterns>
❌ Guessing token counts without parsing the actual `transcript.jsonl` log file.
❌ Forgetting to synchronize the HTML Dashboard file after updating metrics.
</anti_patterns>

---
> [!NOTE]
> This skill supports real-time analysis, automatically generating crisp HTML Dashboards and synchronizing metrics data with `walkthrough.md` reports.
