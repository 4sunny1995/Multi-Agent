# 🧠 Antigravity Project State Checkpoint

> **Purpose**: This file maintains the persistent architectural and directory state of the project (Persistent State), allowing AI agents to quickly onboard without re-running `list_dir` or reading code from scratch in new working sessions.
> **Flow**: Mandatory update by LEADER at the final step of all Workflows (`/dev`, `/fix`).

---

## 1. PROJECT STATUS
- **Infrastructure Status (INF-001)**: Enterprise Multi-Agent Framework Ecosystem (`[MODE: ENTERPRISE]`)
- **Development Phase**: Scaled / Operational (V6.0 - Intelligent Autonomous Era)

## 2. TECHNOLOGY STACK
- **Core Platform**: Google Antigravity Multi-Agent Environment
- **Framework & Config**: Standard Markdown (`.md`), Shell Scripting (`init.sh`), Windows Batch (`init.bat`)
- **Data & Glossary**: JSON (`glossary.json`, `serve-docs.json`)
- **Infrastructure & Deployment**: Bash, Docker-compatible IaC, Multi-platform scripts

## 3. CORE DIRECTORIES & INDEX
- `.agents/`: AI Team orchestrator & core configuration.
  - `.agents/config/`: Master LLM agent configuration ([llm-agent-config.md](file:///.agents/config/llm-agent-config.md)) and project structure rules ([project-structure.md](file:///.agents/config/project-structure.md)).
  - `.agents/roles/`: 13 specialized AI agent roles ([README.md](file:///.agents/roles/README.md), `leader`, `ba`, `sa`, `dev`, `tester`, `designer`, `tech-writer`, `translator`, `security`, `cloud-architect`, `fin-ops`, `auditor`).
  - `.agents/rules/`: 23 governance rules and standards ([README.md](file:///.agents/rules/README.md), AGS-001, DBS-001, DLS-001, DOC-001, INF-001, LPE-001, OPS-001, SHS-001, SWE-001, SSA-001, TTS-001, TRL-IT-001, UIX-001, VER-001, CTO-001, ALG-001, SDC-001, `glossary.json`).
  - `.agents/workflows/`: 13 standardized workflows ([README.md](file:///.agents/workflows/README.md), `analyse`, `audit`, `design`, `dev`, `enterprise-dev`, `fix`, `infra`, `inspect`, `release`, `report`, `retro`, `secure`, `trans`).
  - `.agents/skills/`: 8 specialized skills (`api-security-testing`, `archify`, `audit-system`, `code-review`, `markdown-convert`, `requiment-analyse`, `serve-docs`, `token-tracker`).
- `docs/`: System Knowledge Base & Documentation Registry ([docs/README.md](file:///docs/README.md)).
  - `docs/draft/`: Working draft before review/approval.
  - `docs/original/`: Approved Single Source of Truth (`business/`, `architecture/`, `budget/`, `testing/`, `ui/`, `user-guide/`, `release/`).
  - `docs/trans/`: Multi-language translations (`en/`, `ja/`, `vi/`).
- `src/`: Application source code directory.
- `tests/`: Automated test cases directory.

## 4. SECURITY PROTOCOL
- **Zero-Trust Policy (SHS-001)**: Mandatory pre-commit secret scanning (`grep_search`), zero hardcoded secrets.
- **External Secret & Environment (SDC-001)**: Use `.env` for local environments (listed in `.gitignore`) and Secret Manager for production.
- **Database Protection (DBS-001)**: 3-step mandatory protocol (Survey -> Backup -> PO Approval) for schema modifications.

## 5. TECH DEBTS & LAST ACTION
- **Current Version**: v6.0-llm
- **Last Actions Completed**:
  - Condensed `README.md` and `RESPONSIBLE_AI.md`.
  - Converted `.agents/config/`, 13 `.agents/roles/`, 22 `.agents/rules/`, and 13 `.agents/workflows/` to English (AGS-001).
  - Created `.agents/workflows/README.md` catalog.
  - Updated `init.sh` and `init.bat` to English and synchronized cross-platform directory creation.
  - Repaired broken legacy paths (`/home/quoc/...` -> workspace paths) and indexed all documents in `docs/README.md`.
- **Technical Debt**: None active; all system prompts, rules, workflows, indices, and documentation are fully synchronized.

## 6. SEMANTIC KNOWLEDGE MAP
- **Data Flow**: `USER_REQUEST -> BA Agent (Requirements) -> SA Agent (Architecture) -> DEV Agent (Code) -> TESTER Agent (QA) -> LEADER Agent (7 Gates Audit) -> STATE.md / Walkthrough`
- **Dependency Map**:
  - `Rules` dictate behavior of `Roles` during `Workflows`.
  - `Translator` depends on `glossary.json` and `TRL-IT-001`.
  - `Document Lifecycle` requires `draft/` -> Review & Approve -> `original/` -> Index in `docs/README.md`.
- **Core Abstractions**: AGS-001 (English-First Standard), DLS-001 (Document Lifecycle Standard), TTS-001 (Token Tracking Standard), LPE-001 (LLM Prompt Engineering Standard).

## 7. BUSINESS DOMAIN
- **Core Value Proposition**: An enterprise-ready, autonomous multi-agent software engineering ecosystem operating in Google Antigravity to deliver high-quality, secure, and maintainable software.
- **User Personas**: CTOs, Software Engineers, System Architects, Product Owners, DevOps Engineers.
- **Business Rules**:
  - All system documentation must follow English-First (AGS-001).
  - No file modifications permitted without prior inspection (`view_file`).
  - Zero-Trust security and database protection checkpoints enforced at all gates.
