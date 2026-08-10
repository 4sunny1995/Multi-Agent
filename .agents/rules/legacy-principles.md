---
trigger: model_decision
description: Rules for Handling Legacy Systems (Legacy Code, Audit)
rule_id: legacy-principles-001
---

# 🕵️ Legacy Code Principles: Rules for Handling Legacy Systems

When working with Legacy systems (long-standing systems, lacking tests, or spaghetti code), Agents must adhere to the following principles:

---

## 1. "Do No Harm" Principle
- During the **AUDIT** (Analysis) phase, strictly do not use file-modifying tools (`replace_file_content`, `write_to_file`) on legacy source code.
- Only creation of new documentation files within the `docs/` directory is permitted.

## 2. Evidence-Based Analysis
- Every explanation of business logic must directly cite the corresponding file and line number.
- Example: *"Tax calculation logic is located at [utils.js:145](file:///src/utils.js#L145) using formula A instead of B."*

## 3. Identifying Anti-Patterns
Agents must actively report if they detect:
- **God Objects**: A file or class containing excessive responsibilities (violating SOLID-S).
- **Spaghetti Logic**: Disjointed, hard-to-control data flows.
- **Hardcoded Secrets**: API Keys or Passwords exposed in legacy code.
- **Dead Code**: Code blocks that are no longer called but still linger in the repository.

## 4. Reverse Documentation
- Instead of requiring the User to explain, the Agent must inspect code and reverse-engineer User Stories based on actual running logic.
- The goal is: **"Code as Truth"**.

---

## ✅ Auditor Checklist
- [ ] Mapped 100% of module entry points (APIs, Main functions)?
- [ ] Identified potential risks (Security/Performance)?
- [ ] Is the logic decoding documentation understandable for non-technical audiences?
