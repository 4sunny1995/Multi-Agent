---
rule_id: INF-001
trigger: model_decision
description: Infrastructure, Architecture & Cloud Operations Standards (Infra Detection, Cloud Ops, FinOps)
applies_to: [SA, CLOUD_ARCHITECT, LEADER]
version: "7.0-llm"
---

# 🏗️ Infrastructure & Cloud Operations Standards (INF-001)

<identity>
Unified standards for infrastructure detection, architecture design, and Cloud operations.
Goal: Ensure a solid foundation, cost optimization (FinOps), and self-healing capability.
</identity>

<activation>
Activated when Agents survey the system, design IaC (Docker, Compose), or deploy to the Cloud.
</activation>

<thinking_pattern>
1. Is the current system Greenfield or Legacy? (Read STATE.md).
2. Is the Docker Image optimized (Slim/Alpine) and free of leaked Secrets?
3. How much budget will this proposal consume? Are Billing Alerts configured?
4. Is hot-swapping and fallback resilience ensured upon failure?
</thinking_pattern>

<guidelines>
## 1. INFRASTRUCTURE DETECTION (Pre-flight)
- **Check Memory First**: MANDATORY to read `.agents/STATE.md` first. If present -> Use as context and skip manual scanning.
- **Manual Scan**: If `STATE.md` is absent, use `list_dir` to locate Dockerfile, `.env`, `SQL`, `migrations` to inspect the system.
- **Action Mode**: Classify as `[Initial Infrastructure]` (New Project) or `[Infrastructure Evolution]` (Legacy Project).

## 2. CONTAINERIZATION & DEPLOYMENT
- **Multi-stage Builds**: Mandatory to optimize Image size and security.
- **Base Images**: Prefer Alpine or Slim. Avoid using the `latest` tag.
- **Non-root User**: Strictly forbid running applications under `root` privileges inside containers.
- **Health Checks**: Every service must have a health check endpoint (`/health`).

## 3. FINOPS & CLOUD BUDGET
- **Traffic Scaling**:
    - *Low (<1k req/day)*: Prefer Serverless to optimize costs down to ~$0.
    - *Medium/High*: Use Auto-scaling and Reserved Instances.
- **Billing Alerts**: Declare Alarms (CloudWatch/Budget) directly in IaC code at thresholds of 50%, 80%, 100%.

## 4. DYNAMIC CONFIG & HOT-SWAP
- **Centralized Store**: Runtime config (Feature flags, Thresholds) must be decoupled from code, stored in Redis/AppConfig.
- **Zero-Restart Updates**: Establish mechanisms to update new values without restarting containers/apps.
- **Fallback Resilience**: Always maintain safe default fallback values in source code if the Centralized Store fails.
</guidelines>

<anti_patterns>
❌ Overwriting legacy configuration (`.env`, DB) without a proposal in the Plan.
❌ Building Images with hardcoded Secrets/Tokens embedded in Dockerfile layers.
❌ Running Production without Billing Alerts or Health Checks.
❌ Restarting the application merely to change a minor configuration parameter.
</anti_patterns>

<checklist>
- [ ] Read `STATE.md` and correctly identified Action Mode?
- [ ] Dockerfile contains Multi-stage build and Non-root user?
- [ ] Set up Billing Alerts and cost budget thresholds?
- [ ] Ensured "Default Fallback" for dynamic configurations?
</checklist>
