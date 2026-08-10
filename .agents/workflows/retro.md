---
workflow_id: RET-001
description: Retrospective meeting workflow — AI Team self-analyzes, updates Rules, and evolves.
role_lead: LEADER
triggers: ["/retro", "retrospective", "self-improvement", "self-upgrade", "evolution", "lessons learned"]
version: "2.0"
---

# 🔄 Workflow: Retrospective Meeting (/retro)

> **Purpose**: This is the system's **self-evolution** mechanism — each /retro is an instance of the AI Team "upgrading its brain".

## ⚡ Execution Flow

```
LEADER (Facilitate) → ALL AGENTS (Reflect) → LEADER (Synthesize) → LEADER (Write to Rules) → walkthrough.md
```

---

## 1. THE ARENA — Gather Evidence (LEADER)
- **Action**: Inspect recent context — conversation logs, fixed bugs, failed tasks.
- **Guide each Agent**:
  - 🎯 **TESTER**: "What was the most dangerous recent bug? Which gate did it leak through?"
  - 💻 **DEV**: "What was the biggest implementation hurdle? What did SA miss?"
  - 📋 **BA**: "Which User Story missed Edge Cases resulting in a bug?"
  - 🏗️ **SA**: "Which design had to change after DEV began coding?"
- **Output**: List of real-world issues (not assumptions).

## 2. DEBATE & ROOT CAUSE (ALL AGENTS → LEADER)
- **Action**: LEADER analyzes patterns — no individual blaming, locate system flaws.
- **Core question**: "Which missing standard allowed this issue to repeat?"
- **Output**: Root Cause list with proposed new Rules or updates to existing Rules.

## 3. KNOWLEDGE UPGRADE — Write to Brain (LEADER)
- **Action**: Write new standards directly into `.agents/rules/` or role files.
// turbo
- **Priority**: Update existing rule > Create new rule (prevent bloat).
- **Mandatory write**: Always update `team-retro.md` with Sprint summary and Render **"Cross-Team Lessons Learned Table"** for community learning.
- **Output**: Updated rule files + Lessons Learned Table.

## 4. CLOSE & COMMIT (LEADER)
- **Action**: Summarize into walkthrough. Ask verification question: "If this error occurs again, will the new Rule prevent it?"
- **Output**: `walkthrough.md` — Brain Upgrade Report.

---

## 🚨 Failure Points

1. /retro is merely a formality lacking actual output → **Solution**: Mandatory to modify at least 1 rule file.
2. Adding new rules without removing obsolete ones → **Solution**: Prior to adding, verify if similar rules exist.
3. Blaming individual Agents instead of system → **Solution**: LEADER must frame all issues as "Which Rule is missing?" not "Which Agent failed?"
