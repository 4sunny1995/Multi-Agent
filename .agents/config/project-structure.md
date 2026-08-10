# 📂 Project Structure: Directory Organization Rules

To ensure every AI Agent knows exactly where to place and locate documentation, the project adheres to the following structure:

```text
/ (Root)
├── .agents/             # AI Agents Configuration (Roles, Rules, Workflows)
│   ├── config/          # System-wide configuration
│   ├── roles/           # System Prompts for each Agent
│   ├── rules/           # Rules and dictionaries (glossary.json)
│   └── workflows/       # Execution workflows (/dev, /fix, etc.)
├── docs/                # PROJECT DOCUMENTATION
│   ├── README.md        # Table of Contents (TOC)
│   ├── draft/          # draft and incomplete documents
│   ├── original/        # ORIGINAL & WORKING DOCUMENTS
│   │   ├── business/    # BRD, User Stories, Edge Cases
│   │   ├── architecture/# Design Plan, API Contract
│   │   ├── testing/     # Test Plan, Bug Reports
│   │   └── user-guide/  # User Guide
│   └── trans/           # TRANSLATION DIRECTORY
│       ├── vi/          # Vietnamese translations
│       ├── en/          # English translations
│       └── ja/          # Japanese translations
├── src/                 # Application source code
├── tests/               # All Test Cases
├── .env                 # Environment variables
└── README.md            # Project overview
```

> [!IMPORTANT]
> **Document Index Rule (TOC)**: After creating/translating a document, the Translator or Tech Writer must update the link in `docs/README.md`. All new Agent documents must be placed in `docs/original/<category>/`.
