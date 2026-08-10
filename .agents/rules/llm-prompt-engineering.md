---
rule_id: LPE-001
role: ALL
trigger: model_decision
description: Prompt Engineering Standards for AI Agents (XML tags, Token budget)
version: "1.0"
---

# 📐 LLM Prompt Engineering Standards (LPE-001)

Standards for writing `.agents` documentation to optimize performance across LLM models (Claude, Gemini, GPT). Applies to all Role, Rule, and Workflow files.

---

## 1. Token Budget Rules

- **Each Role file**: Maximum **60 effective lines** (excluding blank/comments).
- **Guidelines**: Maximum **5 points**, each point **1 action sentence** (imperative sentence).
- **Forbidden**: Explanatory paragraphs longer than 3 consecutive sentences.
- **Preference**: Lists (`-`) > Paragraphs > Tables (for short content).

## 2. XML Tag Standards

Every Role file MUST contain all of the following tags in order:

```xml
<identity>   → Who you are, core personality (max 3 lines)
<activation> → When this Role is activated (max 4 conditions)
<mission>    → Main mission, 1-2 sentences (not a list)
<thinking_pattern> → Internal question chain before action
<input_output>     → Table: Phase | Input | Output | Path
<guidelines>       → Max 5 concrete actions, prioritizing strong verbs
<anti_patterns>    → Min 3 STRICTLY FORBIDDEN items (preventing LLM misguessing)
<recommended_tools>→ List of tools + purpose
<constraints>      → Activity scope limits
<output_format>    → Concrete output structure (if needed)
```

## 3. Activation Trigger Syntax

```yaml
# Standard syntax inside <activation>:
triggers:
  - keyword: ["BRD", "User Story", "requirement analysis"]  # → BA
  - keyword: ["design", "Architecture", "Schema"]           # → SA
  - keyword: ["write code", "implement", "fix bug"]        # → DEV
  - workflow: ["/dev", "/fix"]                            # → Activate whole team
```

## 4. Thinking Pattern Template

```
# Pattern for LLM before responding:
1. Am I currently in Role [X]? (Check activation conditions)
2. Is the input from User/previous Agent sufficient? (Check handoff contract)
3. Am I about to do anything that violates anti_patterns? (Self-check)
4. What will my output enable the next Agent to do? (Output contract)
```

## 5. Anti-Pattern Documentation

Every Role MUST declare `<anti_patterns>` with the structure:
```
❌ [Forbidden action] → 💡 [What to do instead]
```

Example:
```
❌ Guessing DB logic when lacking ERD → 💡 Ask SA or read init.sql first
❌ Writing code without unit tests → 💡 Write RED test first, code second
```

## 6. Negative-First Specification

When defining LLM behavior, **declare prohibitions first** — LLMs handle constraints better than positive instructions.

---
> [!IMPORTANT]
> **Check before committing new .agents files:**
> - [ ] Does the file contain all 10 XML tags?
> - [ ] Do Guidelines exceed 5 points? (If yes → must trim)
> - [ ] Is `<anti_patterns>` present?
> - [ ] Does `<activation>` have at least 2 trigger conditions?
