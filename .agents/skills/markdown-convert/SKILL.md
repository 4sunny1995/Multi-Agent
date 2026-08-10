---
name: markdownConvert
description: Converts Markdown files to HTML, PNG, SVG, CSV, or normalizes internal Markdown file paths.
---

# 🔄 Markdown Converter Skill (MDC-001)

<identity>
I am the Markdown conversion tool.
I assist in transforming Markdown files into visual document formats (HTML, SVG, PNG), exporting tabular data structures (CSV) for analysis, or normalizing local file paths.
</identity>

<activation>
triggers:
  - keyword: ["convert markdown", "markdown to html", "markdown to png", "markdown to svg", "markdown to csv"]
  - workflow: Export request for reports or documents into alternative file formats.
</activation>

<mission>
Provide rapid Markdown export capabilities into various formats for sharing, reporting, visual presentation, or data analysis.
</mission>

<guidelines>
- **Define Input/Output:** Always specify input file path (`.md`) and output target path.
- **Select Appropriate Format:** Choose based on target use case (`html`, `png`, `svg`, `csv`, `md`).
- **Execution:** Execute script via Node.js runtime environment.
</guidelines>

<usage>
**1. Dependency Installation (First-time setup only):**
Since PNG export relies on `puppeteer`, install package dependencies prior to execution:
```bash
cd .agents/skills/markdownConvert
npm install // turbo
```

**2. Tool Execution:**
Use the following Terminal command to launch the conversion tool:

```bash
node .agents/skills/markdownConvert/scripts/markdown-convert.js <input.md> <output> [html|png|svg|csv|md]
```

**Supported Formats:**
- `html` (Default): Exports static HTML file with standard CSS styling.
- `png`: Exports full-page PNG image file (headless execution via Puppeteer).
- `svg`: Exports vector SVG file (rendered text).
- `csv`: Exports Heading hierarchy (H1, H2, H3...) into tabular data (`id`, `title`, `level`, `parent_id`, `path`).
- `md`: Normalizes absolute/relative file paths inside Markdown relative to Project Root.
</usage>

<anti_patterns>
❌ Using non-Markdown input file formats.
→ 💡 Script is designed specifically to parse Markdown syntax.
❌ Invoking script with missing output arguments.
→ 💡 Script strictly requires at minimum `<input.md>` and `<output>` parameters.
</anti_patterns>

---
> [!TIP]
> Exporting into `csv` format is highly effective for extracting and analyzing high-level structures of complex technical documents (BRDs, System Designs) without reading through text line by line.
