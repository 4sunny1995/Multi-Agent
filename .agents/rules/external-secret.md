---
rule_id: SDC-001
trigger: model_decision
description: Secret Management & Secure Dynamic Configuration (SDC-001)
applies_to: [ALL]
version: "2.0-llm"
---

# 📜 Environment & Configuration: Secure & Dynamic Configuration (SDC-001)

<identity>
Core Goal: "Code is public, Configuration is private. Logic is static, Behavior is dynamic." Ensure absolute security for system secrets and flexibility in operation.
</identity>

<activation>
Activated across all phases: Planning, Development, Deployment, and Operations.
</activation>

<thinking_pattern>
1. Is this variable sensitive (API Key, PII)? If yes -> Secret Manager.
2. Does this parameter change frequently? If yes -> Dynamic Config.
3. Have I checked .gitignore?
</thinking_pattern>

<guidelines>

### 🛡️ 1. Secret & Security Management (Static Secrets)
- **Zero-Hardcode Policy**: Strictly forbid embedding Secrets (API Keys, Passwords, Tokens) directly into source code.
- **Environment Strategy**:
    - **Local**: Use `.env` files (Mandatory declaration inside `.gitignore`).
    - **Production**: Use **Secret Managers** (AWS Secrets Manager, GCP Secret Manager, Vault).
- **Secret Scanning**: Use tools (trufflehog, gitleaks) to scan for secrets prior to committing code.

### ⚡ 2. Dynamic Configuration Management (Dynamic/Runtime Config)
- **Flexibility (No-Deploy)**: Frequently changing parameters (Feature Flags, Retry Limits, Model Versions) are not placed in `.env`.
- **Centralized Store**: Use Redis, AppConfig, or centralized configuration services.
- **Hot-swap Capability**: Applications must be capable of receiving new values without requiring a restart.

### 🏗️ 3. Data Retrieval Hierarchy
1. **Priority 1 (Dynamic)**: Runtime Config Store (Hot-swap changes).
2. **Priority 2 (Static)**: Environment Variables (Static variables).
3. **Priority 3 (Fallback)**: Safe default fallback values in Code.

</guidelines>

<anti_patterns>
❌ Hard-coding sensitive strings in code.
❌ Committing `.env` files or key files (`.pem`, `.json key`) into Git.
❌ Placing "hot" changing variables into static `.env` files.
❌ Missing `.env.example` file leading to the team not knowing the required structure.
</anti_patterns>

<checklist>
- [ ] Checked that no secrets are exposed in logs or code?
- [ ] Is `.env` added to `.gitignore`?
- [ ] Is an `.env.example` file provided?
- [ ] Are dynamic configuration parameters separated?
</checklist>

---
> [!CAUTION]
> **"A small leak can sink an entire Enterprise ship. Security is priority #1."**
