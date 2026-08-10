---
trigger: always_on
---

# 📊 Token & Agent Interaction Tracking Standard (TTS-001)

<identity>
Standard for tracking & managing Token consumption performance and Agent interaction history within the Antigravity Multi-Agent ecosystem.
Goal: Ensure all communication and workflow executions transparently record consumed token quantities, interaction frequency per AI agent, and detailed token allocation across steps.
</identity>

<activation>
Always active whenever any Agent or Workflow (`/dev`, `/analyse`, `/design`, `/report`, `/fix`, `/enterprise-dev`,...) is launched.
</activation>

<mission>
Record full interaction metrics and token consumption per session, including:
1. List of all participating Agents/Roles in the conversation.
2. Total interaction turn count (Interaction Turn Count).
3. Detailed Token quantities (Prompt Tokens, Completion Tokens, Total Tokens) used per interaction turn.
4. Cumulative Total Tokens for the entire conversation.
</mission>

<guidelines>
- **Automatic Tracking**: At the end of each work turn (Turn) or upon completing a Workflow/Handoff, the Agent is responsible for recording interaction and token usage metrics.
- **Role Identification**: Clearly identify the participating Agent role in communication (BA, SA, DEV, TESTER, LEADER, TECH_WRITER, SECURITY,...).
- **Metric Persistence**: Tracking metrics are persisted at `.agents/metrics/token_metrics.json` and updated in `walkthrough.md` reports.
- **Token Estimation Formula**:
  - English / Code: ~ 1 Token = 4 characters (or ~0.75 words).
  - Non-ASCII / Unicode: ~ 1 Token = 1.5 to 2 characters.
  - Use exact API metadata information when available.
</guidelines>

<output_format>
Every work report or Workflow summary must include the TTS-001 Interaction Tracking Table:

```markdown
### 📊 Agent Interaction & Token Usage Statistics (TTS-001)

- **Session ID**: `{session_id}`
- **Total Interaction Turns**: `{total_turns}` turns
- **Participating Agents**: `{agent_list}`

| Turn (#) | Agent Role | Primary Action / Task | Input Tokens | Output Tokens | Total Tokens | Duration |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Turn 1 | BA Agent | Requirement Analysis & Draft BRD | 1,250 | 850 | 2,100 | HH:MM:SS |
| Turn 2 | SA Agent | Architecture Design & API Contract | 2,100 | 1,400 | 3,500 | HH:MM:SS |
| Turn 3 | LEADER | Document Review & Approval | 950 | 450 | 1,400 | HH:MM:SS |
| **TOTAL** | **3 Agents** | **3 Turns** | **4,300** | **2,700** | **7,000** | -- |
```
</output_format>

<anti_patterns>
❌ Completing a Workflow/Task without recording interaction turns and token usage.
❌ Aggregating token usage without breaking down per participating Agent.
❌ Deleting or overwriting metrics history file `.agents/metrics/token_metrics.json`.
</anti_patterns>

<checklist>
- [ ] Identified the list of participating Agents in the conversation?
- [ ] Accurately counted total interaction turns (Turn count)?
- [ ] Calculated token usage per turn and cumulative total?
- [ ] Persisted metrics to `.agents/metrics/` and attached to report?
</checklist>

---
> [!IMPORTANT]
> **"Resource optimization begins with transparent measurement. TTS-001 controls AI budgets and enhances team productivity."**
