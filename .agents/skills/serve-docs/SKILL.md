---
name: serve-docs
description: Automatically detects ExpressJS applications to embed docs router or launches a standalone internal server serving Markdown documents from docs/original via browser HTML interface.
---

# 🌐 Serve Docs Skill (SRV-001)

<identity>
I am the document publishing and rendering assistance tool.
I automatically detect ExpressJS projects to embed document rendering routers, or launch a Standalone internal Web Server (ExpressJS + Marked) allowing users to read Markdown files in `docs/original` directly in their browser via a clean HTML interface.
</identity>

<activation>
triggers:
  - keyword: ["public docs", "serve docs", "display original docs", "start document server", "embed docs in express"]
  - workflow: When users wish to view or browse Approved documents in `docs/original`.
</activation>

<mission>
1. **Node.js Environment Check**: Check if Node.js runtime is installed. If absent, halt and consult the user on whether to assist with installation.
2. **ExpressJS Detection**: Check if the current project utilizes ExpressJS.
3. **If ExpressJS Application**: Automatically embed `createDocsRouter()` from `.agents/skills/serve-docs/scripts/serve.js` into main entry point (`app.js`, `server.js`, `index.js`, `src/app.ts`, etc.) at route `/docs`.
4. **If non-ExpressJS (or static project)**: Launch Standalone Server independently on port 3000 (or next available port) via command `node .agents/skills/serve-docs/scripts/serve.js`.
</mission>

<guidelines>
- **Step 0: Node.js Environment Check**:
  - Run Node.js version check (`node -v`).
  - **If Node.js is not installed**: Halt immediately and consult user:
    > *"Node.js is currently not installed. Would you like me to assist with installing Node.js (LTS) now?"*
  - If user consents (`Yes`): Proceed with Node.js installation per operating system.
  - If user declines (`No`): Halt skill execution and supply manual installation guidance.

- **Step 1: Express Detection**:
  - Inspect `package.json` in project root for `express` in dependencies.
  - Use `grep_search` or `view_file` to locate main entry point initiating Express app (`express()`, `app.listen`, `const app = express()`, etc.).

- **Step 2A: Auto-Embedding (If Express app detected)**:
  - Identify project module system (ESM `import` vs CommonJS `require`).
  - Use `replace_file_content` to add import statement:
    - *ESM*: `import { createDocsRouter } from './.agents/skills/serve-docs/scripts/serve.js';`
    - *CJS*: `const { createDocsRouter } = require('./.agents/skills/serve-docs/scripts/serve.js');`
  - Insert route declaration prior to `app.listen()` or middleware block:
    `app.use('/docs', createDocsRouter());`
  - Notify User that router has been embedded into Express app accessible at `/docs`.

- **Step 2B: Standalone Mode (If non-Express app)**:
  - Run standalone server launch command: `node .agents/skills/serve-docs/scripts/serve.js`.
  - Supply access URL to user (default: `http://localhost:3000/docs`).
</guidelines>

<configuration>
Port, public directory, `publicAll` flag, and Routes can be configured via `serve-docs.json` at project root.

Sample `serve-docs.json`:
```json
{
  "port": 3000,
  "publicFolder": "docs/original",
  "publicAll": true,
  "routes": {
    "/about": "README.md",
    "/api-v1": "api.md"
  }
}
```
*Notes:* 
- **`publicAll` flag (boolean)**: 
  - `publicAll: true` (Default): Publicly serves all `.md` files in `publicFolder` dynamically. If `routes` are declared, static routes take display precedence alongside dynamic files.
  - `publicAll: false`: **Exclusively serves routes/files explicitly declared in `"routes"`**, securing all other files in `publicFolder`.
- **Auto-copy:** If script runs without a configuration file at project root, system automatically copies default `serve-docs.json` from Skill directory.
</configuration>

<usage>
**1. Install dependencies (if running standalone):**
Navigate to skill directory:
```bash
cd .agents/skills/serve-docs && npm install // turbo
```

**2. Auto-Embed Router into Express App:**
When Express app is detected, AI inserts into server file (e.g. `server.js`):
```javascript
import express from 'express';
import { createDocsRouter } from './.agents/skills/serve-docs/scripts/serve.js';

const app = express();

// Auto-embedded by AI:
app.use('/docs', createDocsRouter());

app.listen(3000, () => console.log('Server listening on port 3000'));
```

**3. Launch Standalone Server:**
If non-Express project:
```bash
node .agents/skills/serve-docs/scripts/serve.js
```
Default server address: `http://localhost:3000/docs`.
</usage>

<anti_patterns>
❌ Using this skill to serve application source code or sensitive files.
→ 💡 Skill is strictly designed to serve `.md` files inside `docs/original`.
❌ Exposing server to Public Internet without authentication.
→ 💡 Tool is intended exclusively for Local Review.
</anti_patterns>

---
> [!NOTE]
> Server supports rendering full Markdown standard components including Tables, Code blocks, and Blockquotes.

