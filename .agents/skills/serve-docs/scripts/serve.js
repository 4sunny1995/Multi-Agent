import { readFileSync, existsSync, readdirSync, statSync, copyFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const skillDir = path.resolve(__dirname, '..');

let express, marked;

async function promptInstall() {
    return new Promise((resolve) => {
        const rl = createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('⚠️ Thiếu thư viện (express, marked). Bạn có muốn tự động cài đặt ngay bây giờ? (y/N): ', (answer) => {
            rl.close();
            resolve(answer.trim().toLowerCase() === 'y' || answer.trim().toLowerCase() === 'yes');
        });
    });
}

try {
    express = (await import('express')).default;
    marked = (await import('marked')).marked;
} catch (err) {
    if (process.stdout.isTTY) {
        const shouldInstall = await promptInstall();
        if (shouldInstall) {
            console.log('🔄 Đang tự động chạy `npm install`...');
            try {
                execSync('npm install', { cwd: skillDir, stdio: 'inherit' });
                console.log('✅ Cài đặt hoàn tất! Đang tiếp tục chạy server...');
                express = (await import('express')).default;
                marked = (await import('marked')).marked;
            } catch (installErr) {
                console.error('❌ Lỗi khi tự động cài đặt:', installErr.message);
                process.exit(1);
            }
        } else {
            console.log('❌ Đã hủy cài đặt. Vui lòng tự cài đặt bằng lệnh: cd .agents/skills/serve-docs && npm install');
            process.exit(1);
        }
    } else {
        console.error('❌ Lỗi: Không tìm thấy thư viện hệ thống (express, marked).');
        console.error('Vui lòng chạy lệnh sau để cài đặt:');
        console.error('  cd .agents/skills/serve-docs && npm install');
        process.exit(1);
    }
}

function getDocTitle(filepath, fallbackName) {
    try {
        if (existsSync(filepath) && statSync(filepath).isFile()) {
            const content = readFileSync(filepath, 'utf8');
            const match = content.match(/^#\s+(.+)$/m);
            if (match && match[1]) {
                let title = match[1].replace(/^[^\w\s\u00C0-\u1EF9A-Za-z0-9]+/g, '').trim();
                if (!title) title = match[1].trim();
                return title;
            }
        }
    } catch (e) {}
    const base = path.basename(fallbackName, '.md');
    return base.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function generateDocLayoutHtml(pageTitle, contentHtml, treeMap = new Map(), baseUrl = '/docs', activePath = '') {
    let sidebarTreeHtml = '';
    if (!treeMap || treeMap.size === 0) {
        sidebarTreeHtml = '<li><span class="nav-link">Không có tài liệu</span></li>';
    } else {
        treeMap.forEach((items, categoryName) => {
            sidebarTreeHtml += `
            <div class="nav-group">
                <div class="nav-group-header">
                    <span class="folder-icon">📁</span>
                    <span class="group-name">${categoryName}</span>
                    <span class="group-count">${items.length}</span>
                </div>
                <ul class="nav-list">
            `;

            items.forEach(item => {
                const isActive = activePath === item.routePath ? 'active' : '';
                sidebarTreeHtml += `
                    <li class="nav-item">
                        <a href="${baseUrl}/${item.routePath}" class="nav-link ${isActive}" title="${item.title}">
                            <span class="file-icon">📄</span>
                            <span class="file-title">${item.title}</span>
                        </a>
                    </li>
                `;
            });

            sidebarTreeHtml += `
                </ul>
            </div>
            `;
        });
    }

    return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${pageTitle} - Antigravity Docs</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
        <style>
            :root {
                --bg-primary: #0f172a;
                --bg-secondary: #1e293b;
                --bg-sidebar: #0f172a;
                --bg-card: #1e293b;
                --text-primary: #f8fafc;
                --text-secondary: #94a3b8;
                --accent-color: #38bdf8;
                --accent-hover: #0284c7;
                --border-color: #334155;
                --code-bg: #1e293b;
            }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
                background-color: var(--bg-primary);
                color: var(--text-primary);
                display: flex;
                flex-direction: column;
                min-height: 100vh;
            }
            /* Header */
            header.top-header {
                height: 64px;
                background: rgba(15, 23, 42, 0.85);
                backdrop-filter: blur(12px);
                border-bottom: 1px solid var(--border-color);
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 1.5rem;
                position: sticky;
                top: 0;
                z-index: 100;
            }
            .brand {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                text-decoration: none;
                color: var(--text-primary);
                font-weight: 700;
                font-size: 1.15rem;
            }
            .brand-logo {
                width: 34px;
                height: 34px;
                background: linear-gradient(135deg, #38bdf8, #818cf8);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.1rem;
                box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
            }
            .badge {
                font-size: 0.75rem;
                padding: 0.25rem 0.65rem;
                border-radius: 9999px;
                background: rgba(56, 189, 248, 0.1);
                color: var(--accent-color);
                border: 1px solid rgba(56, 189, 248, 0.25);
                font-weight: 600;
            }

            /* Container Layout */
            .layout-container {
                display: flex;
                flex: 1;
            }

            /* Sidebar Menu */
            aside.sidebar {
                width: 300px;
                background: var(--bg-sidebar);
                border-right: 1px solid var(--border-color);
                padding: 1.5rem 1rem;
                position: sticky;
                top: 64px;
                height: calc(100vh - 64px);
                overflow-y: auto;
            }
            .sidebar-title {
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                color: var(--text-secondary);
                font-weight: 700;
                margin-bottom: 1.25rem;
                padding-left: 0.5rem;
            }
            
            /* Nav Group & Tree */
            .nav-group {
                margin-bottom: 1.25rem;
            }
            .nav-group-header {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.4rem 0.5rem;
                font-size: 0.8rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: #94a3b8;
                margin-bottom: 0.4rem;
            }
            .folder-icon { font-size: 0.95rem; }
            .group-name { flex: 1; }
            .group-count {
                font-size: 0.7rem;
                background: rgba(255, 255, 255, 0.08);
                color: #cbd5e1;
                padding: 0.1rem 0.45rem;
                border-radius: 999px;
            }
            .nav-list {
                list-style: none;
                padding-left: 0.6rem;
                border-left: 1.5px solid rgba(255, 255, 255, 0.08);
                margin-left: 0.75rem;
            }
            .nav-item { margin-bottom: 0.25rem; }
            .nav-link {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 0.65rem;
                color: var(--text-secondary);
                text-decoration: none;
                border-radius: 6px;
                font-size: 0.875rem;
                font-weight: 500;
                transition: all 0.2s ease;
            }
            .file-icon { font-size: 0.85rem; opacity: 0.7; }
            .file-title {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .nav-link:hover {
                color: var(--text-primary);
                background: rgba(255, 255, 255, 0.05);
            }
            .nav-link.active {
                color: var(--accent-color);
                background: rgba(56, 189, 248, 0.12);
                font-weight: 600;
            }
            .nav-link.active .file-icon { opacity: 1; }

            /* Main Content Area */
            main.main-content {
                flex: 1;
                padding: 2.5rem 3.5rem;
                max-width: 980px;
                margin: 0 auto;
                width: 100%;
            }
            .markdown-body {
                line-height: 1.75;
                font-size: 1rem;
                color: #e2e8f0;
            }
            .markdown-body h1 {
                font-size: 2.25rem;
                font-weight: 800;
                margin-bottom: 1.5rem;
                padding-bottom: 0.75rem;
                border-bottom: 1px solid var(--border-color);
                color: #ffffff;
                letter-spacing: -0.025em;
            }
            .markdown-body h2 {
                font-size: 1.5rem;
                font-weight: 700;
                margin-top: 2.25rem;
                margin-bottom: 1rem;
                padding-bottom: 0.5rem;
                border-bottom: 1px solid var(--border-color);
                color: #f1f5f9;
            }
            .markdown-body h3 {
                font-size: 1.25rem;
                font-weight: 600;
                margin-top: 1.75rem;
                margin-bottom: 0.75rem;
                color: #cbd5e1;
            }
            .markdown-body p { margin-bottom: 1.25rem; color: #cbd5e1; }
            .markdown-body ul, .markdown-body ol {
                margin-bottom: 1.25rem;
                padding-left: 1.5rem;
                color: #cbd5e1;
            }
            .markdown-body li { margin-bottom: 0.4rem; }
            .markdown-body code {
                font-family: 'Fira Code', monospace;
                background-color: rgba(51, 65, 85, 0.5);
                color: #38bdf8;
                padding: 0.2em 0.45em;
                border-radius: 6px;
                font-size: 0.875em;
            }
            .markdown-body pre {
                background-color: var(--code-bg);
                border: 1px solid var(--border-color);
                padding: 1.25rem;
                border-radius: 10px;
                overflow-x: auto;
                margin-bottom: 1.5rem;
            }
            .markdown-body pre code { background: transparent; padding: 0; color: #f8fafc; }
            .markdown-body blockquote {
                border-left: 4px solid var(--accent-color);
                padding: 0.75rem 1.25rem;
                background: rgba(56, 189, 248, 0.05);
                border-radius: 0 8px 8px 0;
                margin-bottom: 1.5rem;
                color: #94a3b8;
            }
            .markdown-body table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 1.5rem;
            }
            .markdown-body th, .markdown-body td {
                border: 1px solid var(--border-color);
                padding: 0.75rem 1rem;
                text-align: left;
            }
            .markdown-body th {
                background-color: var(--bg-secondary);
                color: #ffffff;
                font-weight: 600;
            }
            .markdown-body tr:nth-child(even) { background-color: rgba(30, 41, 59, 0.4); }
            .markdown-body a { color: var(--accent-color); text-decoration: none; }
            .markdown-body a:hover { text-decoration: underline; }
            @media (max-width: 768px) {
                .layout-container { flex-direction: column; }
                aside.sidebar { width: 100%; height: auto; position: relative; top: 0; }
                main.main-content { padding: 1.5rem 1rem; }
            }
        </style>
    </head>
    <body>
        <header class="top-header">
            <a href="${baseUrl}/" class="brand">
                <div class="brand-logo">🛸</div>
                <span>Antigravity Docs Hub</span>
            </a>
            <div class="badge">Enterprise Approved</div>
        </header>
        
        <div class="layout-container">
            <aside class="sidebar">
                <div class="sidebar-title">Danh mục tài liệu</div>
                ${sidebarTreeHtml}
            </aside>
            
            <main class="main-content">
                <div class="markdown-body">
                    ${contentHtml}
                </div>
            </main>
        </div>
    </body>
    </html>
    `;
}

function getMarkdownFiles(dirPath, baseDir = dirPath) {
    let results = [];
    if (!existsSync(dirPath)) return results;
    const list = readdirSync(dirPath);
    list.forEach(file => {
        const fullPath = path.join(dirPath, file);
        const stat = statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getMarkdownFiles(fullPath, baseDir));
        } else if (file.endsWith('.md')) {
            const relativePath = path.relative(baseDir, fullPath);
            results.push(relativePath);
        }
    });
    return results;
}

function isDocFileExists(filename, DOCS_DIR, WORKSPACE_DIR = process.cwd()) {
    try {
        const inDocs = path.resolve(DOCS_DIR, filename);
        if (inDocs.startsWith(DOCS_DIR) && existsSync(inDocs) && statSync(inDocs).isFile()) {
            return true;
        }
        const inRoot = path.resolve(WORKSPACE_DIR, filename);
        if (inRoot.startsWith(WORKSPACE_DIR) && existsSync(inRoot) && statSync(inRoot).isFile()) {
            return true;
        }
    } catch (e) {}
    return false;
}

function serveMarkdownFile(req, res, filename, DOCS_DIR, treeMap = new Map(), activePath = '') {
    const WORKSPACE_DIR = process.cwd();
    let filepath = path.resolve(DOCS_DIR, filename);

    if (!existsSync(filepath) || !statSync(filepath).isFile()) {
        const rootFilepath = path.resolve(WORKSPACE_DIR, filename);
        if (existsSync(rootFilepath) && statSync(rootFilepath).isFile()) {
            filepath = rootFilepath;
        }
    }

    if (!filepath.startsWith(WORKSPACE_DIR)) {
        return res.status(403).send('Forbidden: Access outside workspace is denied.');
    }

    if (!existsSync(filepath) || !statSync(filepath).isFile()) {
        const errorHtml = `<h1>❌ 404 - Document Not Found</h1><p>Tài liệu <code>${filename}</code> không tồn tại trên hệ thống.</p>`;
        return res.status(404).send(generateDocLayoutHtml('404 Not Found', errorHtml, treeMap, req.baseUrl || '/docs', activePath));
    }

    const markdown = readFileSync(filepath, 'utf8');
    const htmlContent = marked.parse(markdown);
    const baseUrl = req.baseUrl || '/docs';
    const pageTitle = getDocTitle(filepath, filename);

    res.send(generateDocLayoutHtml(pageTitle, htmlContent, treeMap, baseUrl, activePath));
}

/**
 * Tạo Express Router để mount vào project chính
 * @param {Object} options 
 */
export function createDocsRouter(options = {}) {
    let config = { publicFolder: 'docs/original', publicAll: true, routes: {}, ...options };
    
    const rootConfigPath = path.resolve(process.cwd(), 'serve-docs.json');
    const defaultConfigPath = path.resolve(__dirname, '../serve-docs.json');

    if (!existsSync(rootConfigPath) && existsSync(defaultConfigPath)) {
        try {
            copyFileSync(defaultConfigPath, rootConfigPath);
            console.log('✅ Đã tạo file cấu hình mặc định serve-docs.json tại thư mục gốc.');
        } catch(e) {
            console.error('Lỗi khi copy serve-docs.json:', e.message);
        }
    }

    if (existsSync(rootConfigPath)) {
        try {
            const fileConfig = JSON.parse(readFileSync(rootConfigPath, 'utf8'));
            config = { ...config, ...fileConfig };
        } catch(e) {
            console.error('Error reading serve-docs.json:', e.message);
        }
    }

    const DOCS_DIR = path.resolve(process.cwd(), config.publicFolder);
    const WORKSPACE_DIR = process.cwd();
    const router = express.Router();
    const isPublicAll = config.publicAll !== false;

    // Lọc danh sách routes hợp lệ (chỉ giữ lại những route trỏ tới file THỰC SỰ TỒN TẠI)
    const validRoutes = {};
    if (config.routes && Object.keys(config.routes).length > 0) {
        Object.entries(config.routes).forEach(([routePath, filename]) => {
            if (isDocFileExists(filename, DOCS_DIR, WORKSPACE_DIR)) {
                validRoutes[routePath] = filename;
            }
        });
    }

    // Xây dựng Cây Danh Mục (Folder -> Files) cho Sidebar Nav
    function getNavTree() {
        const tree = new Map(); // CategoryName -> Array of { routePath, title, filename }
        const addedPaths = new Set();
        const addedFilepaths = new Set();

        function addDocItem(categoryName, routePath, filepath, filename) {
            const canonicalPath = path.resolve(filepath);
            if (addedPaths.has(routePath) || addedFilepaths.has(canonicalPath)) return;
            addedPaths.add(routePath);
            addedFilepaths.add(canonicalPath);

            const title = getDocTitle(filepath, filename);
            if (!tree.has(categoryName)) {
                tree.set(categoryName, []);
            }
            tree.get(categoryName).push({ routePath, title, filename });
        }

        // 1. Thêm từ validRoutes
        Object.entries(validRoutes).forEach(([routePath, filename]) => {
            const normalizedPath = routePath.startsWith('/') ? routePath.slice(1) : routePath;
            let filepath = path.resolve(DOCS_DIR, filename);
            if (!existsSync(filepath)) filepath = path.resolve(WORKSPACE_DIR, filename);

            const dirName = path.dirname(filename);
            let categoryName = "Tổng quan";
            if (dirName && dirName !== '.') {
                categoryName = dirName.split('/')[0].replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                if (categoryName.toLowerCase() === 'ui') categoryName = 'UI / UX Design';
            }

            addDocItem(categoryName, normalizedPath, filepath, filename);
        });

        // 2. Thêm từ các file động trong DOCS_DIR
        if (isPublicAll && existsSync(DOCS_DIR)) {
            const files = getMarkdownFiles(DOCS_DIR);
            files.forEach(f => {
                const normalizedPath = encodeURIComponent(f);
                const filepath = path.resolve(DOCS_DIR, f);
                const dirName = path.dirname(f);
                let categoryName = "Tài liệu chung";
                if (dirName && dirName !== '.') {
                    categoryName = dirName.split('/')[0].replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                    if (categoryName.toLowerCase() === 'ui') categoryName = 'UI / UX Design';
                }
                addDocItem(categoryName, normalizedPath, filepath, f);
            });
        }

        return tree;
    }

    // Route trang chủ (/docs/)
    router.get('/', (req, res) => {
        const treeMap = getNavTree();
        const baseUrl = req.baseUrl || '/docs';

        let firstItem = null;
        for (const items of treeMap.values()) {
            if (items && items.length > 0) {
                firstItem = items[0];
                break;
            }
        }

        if (firstItem) {
            return serveMarkdownFile(req, res, firstItem.filename, DOCS_DIR, treeMap, firstItem.routePath);
        } else {
            const emptyContent = `
                <h1>📚 Antigravity Documentation Hub</h1>
                <p>Hiện chưa có tài liệu nào trong thư mục <code>${config.publicFolder}</code>.</p>
            `;
            return res.send(generateDocLayoutHtml('Documentation', emptyContent, treeMap, baseUrl, ''));
        }
    });

    // Đăng ký các routes chỉ định hợp lệ
    Object.entries(validRoutes).forEach(([routePath, filename]) => {
        const normalizedPath = routePath.startsWith('/') ? routePath : `/${routePath}`;
        router.get(normalizedPath, (req, res) => {
            const treeMap = getNavTree();
            const activePath = routePath.startsWith('/') ? routePath.slice(1) : routePath;
            serveMarkdownFile(req, res, filename, DOCS_DIR, treeMap, activePath);
        });
    });

    // If publicAll = true: Route catch-all cho các file động trong publicFolder
    if (isPublicAll) {
        router.get('*', (req, res) => {
            const treeMap = getNavTree();
            const relPath = decodeURIComponent(req.path.slice(1));
            serveMarkdownFile(req, res, relPath, DOCS_DIR, treeMap, relPath);
        });
    }

    return router;
}

// Chạy trực tiếp qua Terminal (Standalone mode)
if (import.meta.url === `file://${process.argv[1]}`) {
    let config = { port: 3000 };
    
    const rootConfigPath = path.resolve(process.cwd(), 'serve-docs.json');
    const defaultConfigPath = path.resolve(__dirname, '../serve-docs.json');

    if (!existsSync(rootConfigPath) && existsSync(defaultConfigPath)) {
        try {
            copyFileSync(defaultConfigPath, rootConfigPath);
        } catch(e) {}
    }

    if (existsSync(rootConfigPath)) {
        try {
            const fileConfig = JSON.parse(readFileSync(rootConfigPath, 'utf8'));
            config = { ...config, ...fileConfig };
        } catch(e) {
            console.error('Lỗi file config serve-docs.json:', e.message);
        }
    }

    const app = express();
    const PORT = process.env.PORT || config.port;
    
    app.use('/docs', createDocsRouter(config));
    app.get('/', (req, res) => res.redirect('/docs'));

    let currentPort = parseInt(PORT, 10);
    
    function startServer(port) {
        const server = app.listen(port, () => {
            console.log(`🚀 Document server running at http://localhost:${port}/docs`);
        });

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.log(`⚠️ Port ${port} is in use, trying ${port + 1}...`);
                startServer(port + 1);
            } else {
                console.error('Server error:', err);
            }
        });
    }

    startServer(currentPort);
}
