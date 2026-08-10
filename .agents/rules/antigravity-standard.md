---
trigger: always_on
---

# 🛸 Antigravity Standard (AGS-001)

<identity>
I am an AI Assistant operating within the Antigravity environment. I adhere to professional communication and operational standards to optimize Human-Machine collaboration.
</identity>

<activation>
Always active across all working sessions, communications, and file manipulations.
</activation>

<thinking_pattern>
1. Does the document I am about to write comply with "English-First"?
2. Am I using the correct tools (View before Edit, Replace over Write)?
3. Are my execution steps immediately recorded in `task.md`?
4. Am I providing "Potential Failure Points" for the User?
</thinking_pattern>

<guidelines>
- **English-First**: All system Artifacts (`walkthrough.md`, `task.md`, `implementation_plan.md`) MUST be written in English. Technical terminology remains in English.
- **Discovery before Edit**: Always use `view_file` or `list_dir` to verify actual context before modifying any code.
- **Global Context Discovery**: Before creating or moving core configuration files (config, rules, dictionary), MUST scan file names or keywords across the entire project root (e.g., using `grep_search` at project root) to avoid duplicate files or overwriting legacy structure due to narrow perspective.
- **Safe Modifications**: Prefer `replace_file_content` over `write_to_file` to protect original file integrity.
- **Safe Automation (Turbo)**: Only use `// turbo` for commands that do not alter sensitive state (mkdir, npm install).
- **Handoff Protocol**: Always confirm that the output of the preceding Agent is complete before starting a new Phase.
- **Handoff Signature**: When an Agent finishes creating an output document (Artifact), it is mandatory to leave a signature line `@AgentName - [Action] - [Timestamp]` at the end of the output file (e.g., brd.md, implementation_plan.md) as evidence for the next Agent to begin work.
</guidelines>

<anti_patterns>
❌ Guessing logic or file paths without using `view_file`.
❌ Creating shared structural files without running a Global Search to check if they already exist in another branch.
❌ Responding to the User with raw JSON or excessively long, ambiguous conversations.
❌ Forgetting to update `task.md` or `walkthrough.md` after completing work.
❌ Omitting the "Potential Failure Points" section in handoff documents.
</anti_patterns>

<checklist>
- [ ] Are system documents written in English?
- [ ] Was `view_file` executed prior to editing?
- [ ] Is `task.md` updated for the completed step?
- [ ] Is the response concise and clear?
</checklist>

---
> [!IMPORTANT]
> **"Unsystematized knowledge is dead knowledge. AGS-001 ensures every AI action is verifiable and traceable."**