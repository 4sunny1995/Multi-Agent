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

function generateIndexHtml(links) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document Index</title>
        <style>
            body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 2rem auto; padding: 0 1rem; line-height: 1.6; }
            a { color: #0366d6; text-decoration: none; }
            a:hover { text-decoration: underline; }
            ul { list-style-type: none; padding: 0; }
            li { padding: 0.5rem 0; border-bottom: 1px solid #eaecef; }
        </style>
    </head>
    <body>
        <h1>📚 Tài liệu chính thức</h1>
        <ul>
            ${links || '<li>Không có tài liệu nào.</li>'}
        </ul>
    </body>
    </html>
    `;
}

function generateDocHtml(filename, content, baseUrl) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${filename}</title>
        <style>
            body { font-family: system-ui, -apple-system, sans-serif; max-width: 900px; margin: 2rem auto; padding: 0 1rem; line-height: 1.6; color: #24292e; }
            h1, h2, h3 { border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
            code { background-color: #f6f8fa; padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace; }
            pre { background-color: #f6f8fa; padding: 16px; overflow: auto; border-radius: 3px; }
            pre code { background-color: transparent; padding: 0; }
            blockquote { margin: 0; padding: 0 1em; color: #6a737d; border-left: 0.25em solid #dfe2e5; }
            table { border-collapse: collapse; width: 100%; margin-bottom: 1rem; }
            table th, table td { border: 1px solid #dfe2e5; padding: 6px 13px; }
            table tr:nth-child(2n) { background-color: #f6f8fa; }
            .back-link { display: inline-block; margin-bottom: 2rem; color: #0366d6; text-decoration: none; }
            .back-link:hover { text-decoration: underline; }
        </style>
    </head>
    <body>
        <a href="${baseUrl}/" class="back-link">← Quay lại danh mục</a>
        ${content}
    </body>
    </html>
    `;
}

function serveMarkdownFile(req, res, filename, DOCS_DIR) {
    const filepath = path.join(DOCS_DIR, filename);
    if (!filepath.startsWith(DOCS_DIR)) {
        return res.status(403).send('Forbidden');
    }
    if (!existsSync(filepath) || !statSync(filepath).isFile()) {
        return res.status(404).send('Document not found: ' + filename);
    }
    const markdown = readFileSync(filepath, 'utf8');
    const htmlContent = marked.parse(markdown);
    const baseUrl = req.baseUrl || '/docs';
    res.send(generateDocHtml(filename, htmlContent, baseUrl));
}

/**
 * Tạo Express Router để mount vào project chính
 * @param {Object} options 
 */
export function createDocsRouter(options = {}) {
    let config = { publicFolder: 'docs/original', routes: {}, ...options };
    
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
    const router = express.Router();

    // Nếu người dùng cấu hình "routes" tĩnh
    if (config.routes && Object.keys(config.routes).length > 0) {
        router.get('/', (req, res) => {
            const baseUrl = req.baseUrl || '/docs';
            let links = Object.entries(config.routes).map(([routePath, filename]) => {
                const normalizedPath = routePath.startsWith('/') ? routePath.slice(1) : routePath;
                return `<li><a href="${baseUrl}/${normalizedPath}">${filename}</a></li>`;
            }).join('');
            res.send(generateIndexHtml(links));
        });

        Object.entries(config.routes).forEach(([routePath, filename]) => {
            const normalizedPath = routePath.startsWith('/') ? routePath : `/${routePath}`;
            router.get(normalizedPath, (req, res) => {
                serveMarkdownFile(req, res, filename, DOCS_DIR);
            });
        });
    } 
    // Nếu không cấu hình "routes", dùng router động đọc tất cả file trong folder
    else {
        router.get('/', (req, res) => {
            if (!existsSync(DOCS_DIR)) {
                return res.status(404).send(`Directory ${DOCS_DIR} not found.`);
            }
            const files = readdirSync(DOCS_DIR).filter(f => f.endsWith('.md'));
            const baseUrl = req.baseUrl || '/docs';
            let links = files.map(f => `<li><a href="${baseUrl}/${encodeURIComponent(f)}">${f}</a></li>`).join('');
            res.send(generateIndexHtml(links));
        });

        router.get('/:filename', (req, res) => {
            serveMarkdownFile(req, res, req.params.filename, DOCS_DIR);
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
