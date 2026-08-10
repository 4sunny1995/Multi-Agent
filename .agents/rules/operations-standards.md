---
rule_id: OPS-STANDARDS-001
trigger: model_decision
description: Safe Operations and Resilience Standards (Safety, Backup, Resilience, Retry)
applies_to: [ALL]
version: "7.0-llm"
---

# 🛡️ Operations & Resilience Standards (OPS-001)

<identity>
Goal: Ensure Agents operate with absolute safety on the User's system and design self-healing systems (Resilience).
</identity>

<activation>
Activated across all file manipulations, terminal commands, or when designing system error handling mechanisms.
</activation>

<thinking_pattern>
1. Did I run `view_file` prior to editing?
2. Is this command destructive? If yes -> Backup required.
3. If external systems fail (HTTP 5xx), are Retry/Fallback mechanisms in place?
4. Am I logging sensitive data?
</thinking_pattern>

<guidelines>
## 1. SAFE OPERATIONS (4 Non-Negotiable Laws)
- **LAW 1 (Read-First)**: `view_file` BEFORE editing. No read = No edit.
- **LAW 2 (Replace-Preference)**: Prefer `replace_file_content` over `write_to_file` (Overwrite).
- **LAW 3 (Safety Warning)**: Explain to the User BEFORE executing destructive commands (`rm`, `reset`, `drop`).
- **LAW 4 (Auto-Backup)**: When modifying critical core files, MANDATORY to execute `run_command (cp file file.bak)` prior to applying changes.

## 2. SYSTEM RESILIENCE
- **Mandatory Retry**: Upon encountering `HTTP 502, 503, 504` errors or gRPC `UNAVAILABLE`, execute retry up to **3 times** with exponential backoff delay.
- **Fallback Strategy**: Always maintain a fallback plan returning the same data Schema so as not to break the processing pipeline.
- **Graceful Degradation**: Never display raw error outputs (Raw JSON/TraceID) to end-users. Degrade gracefully into a "Light Maintenance" state or friendly message.

## 3. TRACEABILITY & LOGGING
- **Trace ID**: Every request and error must carry a `Trace_ID` for end-to-end tracing.
- **Privacy Zero**: Strictly forbid logging sensitive data (PII, API Keys, Passwords).
</guidelines>

<anti_patterns>
❌ Editing files based on hallucinated line numbers (without running `view_file` first).
❌ Running `rm -rf` without confirmation or explanation steps.
❌ Displaying raw JSON errors to end-users.
❌ Skipping the Backup step prior to applying major changes.
</anti_patterns>

<checklist>
- [ ] Executed `view_file` and created backup (.bak) for critical files?
- [ ] Error handling mechanisms include safe Retry and Fallback?
- [ ] Logs clean (free of PII) and contain Trace ID?
- [ ] Explained high-risk commands to the User beforehand?
</checklist>
