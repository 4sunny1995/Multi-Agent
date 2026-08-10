---
rule_id: SSA-001
trigger: model_decision
description: Scale Adaptation Strategy (S/M/L) to prevent over-decomposition
applies_to: [LEADER, SA, BA, DEV]
version: "1.0-llm"
---

# 🚀 System Scale Alignment (SSA-001): Scale Adaptation Strategy

<identity>
Goal: Ensure the AI Team delivers technical solutions appropriate to the project's development phase, avoiding resource waste (Over-engineering) or operational risks (Under-engineering).
</identity>

<activation>
Activated when:
1. Starting a new project (`/dev`).
2. Performing architectural design (`SA`).
3. Noticing source code/infrastructure capacity limits relative to original design (`[SCALE_UP_ALERT]`).
</activation>

<thinking_pattern>
1. What phase is this project currently in (MVP, Growth, or Enterprise)?
2. Is Speed or Stability the #1 priority right now?
3. Does this solution hinder future scale-up efforts?
</thinking_pattern>

<guidelines>

### 🟢 1. SMALL Level (Small / MVP)
- **Priorities**: Speed & Low Cost.
- **Actions**:
    - Architecture: Monolith or Simple Separation of Concerns (SoC).
    - Database: Single DB instance, simple schema.
    - Deployment: Docker Compose, basic GitHub Actions.
    - **Lesson**: "Run first, optimize later. Don't use Kubernetes for a Landing Page."

### 🟡 2. MEDIUM Level (Medium / Growth)
- **Priorities**: Flexibility & Performance.
- **Actions**:
    - Architecture: Modular Monolith or simple Microservices.
    - Database: Read/Write Split, in-depth Indexing.
    - Deployment: Full CI/CD Pipeline, Staging Environment.
    - **Lesson**: "Technical debt begins accruing interest. Enforce strict SOLID and TDD."

### 🔴 3. LARGE Level (Large / Enterprise)
- **Priorities**: Stability, Security & Governance.
- **Actions**:
    - Architecture: Distributed Microservices, Event-driven.
    - Database: Distributed DB, Strict Migration (DBS-001).
    - Deployment: Kubernetes, Multi-region, High Security Gates (SHS-001).
    - **Lesson**: "Complexity is the enemy of ops. Reporting (TRS-001) and Monitoring are vital."

</guidelines>

<anti_patterns>
❌ **Over-engineering**: Applying Microservices for a project with < 1,000 users/day.
❌ **Under-engineering**: Sharing a single DB password across an entire large banking system.
❌ **Scale-Mismatch**: Skipping Unit Tests at the Enterprise phase to gain speed.
</anti_patterns>

<checklist>
- [ ] Correctly identified project scale (Traffic/Data/Team size)?
- [ ] Does the solution allow Rollback/Recovery?
- [ ] [SCALE_UP_ALERT]: Does the current system need transition to a higher tier?
</checklist>

---
> [!IMPORTANT]
> **"Don't lay an 80-story foundation for a 1-story house, but don't build an 80-story skyscraper with single-story house bricks."**
