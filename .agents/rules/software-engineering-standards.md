---
rule_id: SWE-001
trigger: model_decision
description: Integrated Software Engineering Standards (Clean Code, SOLID, TDD, Patterns)
applies_to: [SA, DEV, TESTER, LEADER]
version: "7.0-llm"
---

# 🛠️ Software Engineering Standards (SWE-001)

<identity>
Unified Engineering Standards. Supreme principle: "Easier to Read than Write, Easier to Edit than Add."
</identity>

<activation>
Triggers when reviewing architecture (SA), writing code (DEV), or reviewing pull requests (LEADER).
</activation>

<thinking_pattern>
1. Does this code violate the Single Responsibility Principle (SRP)?
2. Is this function longer than 15 lines or containing more than 2 parameters?
3. Is the design quick-fix in nature (Hardcoded, Magic Numbers)?
4. Does test coverage extend to Edge Cases?
</thinking_pattern>

<guidelines>
## 1. THE MINIMALIST MINDSET (KISS & YAGNI)
- **KISS (Keep It Simple, Stupid)**: The simplest solution is always the best. Do not overuse Design Patterns if a pure function handles the job well.
- **YAGNI (You Ain't Gonna Need It)**: Do not pre-code for "the future". Code strictly for current business needs.

## 2. SOLID PRINCIPLES
- **S (Single Responsibility)**: Each Class/Module has only 1 reason to change.
- **O (Open/Closed)**: Adding features = Adding new classes/files, STRICTLY limit modifying existing files.
- **L (Liskov Substitution)**: Subclasses must not break expectations of base classes.
- **I (Interface Segregation)**: Do not cluster bloated interfaces. Split into small specialized interfaces.
- **D (Dependency Inversion)**: High-level modules call low-level modules through Interfaces/Abstractions.

## 3. CLEAN CODE METRICS
- **Naming Rule**: Declare purpose clearly (`daysSinceCreation` instead of `d`). Do not use `data`, `temp`, `obj`.
- **Function Rule**: `< 15 lines`, `≤ 2 parameters`. 1 Verb + 1 Noun, do exactly 1 thing. Use **Guard Clauses** (Return early) instead of nesting `if-else` deeper than 3 levels.
- **Side Effects**: `get*` functions strictly must not mutate external state.

## 4. TESTING STANDARDS (TDD & F.I.R.S.T)
- **TDD Flow**: RED (write failing test) → GREEN (write just enough code) → REFACTOR (clean up).
- **F.I.R.S.T**: Fast (<100ms), Independent (Mocking), Repeatable, Self-Validating, Timely.
- **AAA Structure**: Arrange - Act - Assert.
- **Edge Cases**: Every feature must have ≥ 3 boundary scenarios (Null, Empty, Extreme value).

## 5. REFACTORING & TECHNICAL DEBT
- **Boy Scout Rule**: Always leave files cleaner than you found them.
- **Debt Tagging**: Detect code smell → Tag with `[TECH_DEBT: reason]`.
</guidelines>

<anti_patterns>
❌ Writing God Functions (> 50 lines, handling both UI and DB).
❌ Using long `if-else` chains instead of Strategy/Polymorphism.
❌ Meaningless variable naming (`data`, `res`, `flag`).
❌ Writing code before writing tests or skipping Edge Cases.
</anti_patterns>

<checklist>
- [ ] Code is self-documenting without long comments?
- [ ] Functions do not exceed `if-else` nesting > 3 levels or length > 15 lines?
- [ ] Completely checked and eliminated Hardcoded/Magic Numbers?
- [ ] Tests fully isolated (Mocking DB/Network) and covering Edge Cases?
</checklist>
