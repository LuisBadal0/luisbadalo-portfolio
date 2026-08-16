'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const ROOT = __dirname;

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2'
};

const SECURITY_HEADERS = {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; base-uri 'self'; form-action 'self'; frame-ancestors 'none'",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    'X-XSS-Protection': '0'
};

const COMPRESSIBLE = new Set(['.html', '.css', '.js', '.json', '.svg', '.txt', '.xml']);
const gzipCache = new Map();

function cacheControlFor(filePath) {
    if (filePath.endsWith('index.html') || filePath.endsWith('404.html')) return 'no-cache';
    if (/\.(css|js)$/.test(filePath)) return 'no-cache';
    return 'public, max-age=604800';
}

function loadFile(filePath) {
    const abs = path.join(ROOT, filePath);
    if (!fs.existsSync(abs)) return null;
    const stat = fs.statSync(abs);
    if (!stat.isFile()) return null;
    return { abs, size: stat.size, mtime: stat.mtime.toUTCString(), etag: `"${stat.mtimeMs}-${stat.size}"` };
}

function serve(req, res, filePath, status) {
    const info = loadFile(filePath);
    if (!info) {
        if (filePath !== '404.html' && fs.existsSync(path.join(ROOT, '404.html'))) {
            serve(req, res, '404.html', 404);
        } else {
            res.writeHead(500);
            res.end('Internal server error');
        }
        return;
    }

    const headers = {
        'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream',
        'Cache-Control': cacheControlFor(filePath),
        'Vary': 'Accept-Encoding',
        'ETag': info.etag,
        'Last-Modified': info.mtime,
        ...SECURITY_HEADERS
    };

    if (req.headers['if-none-match'] === info.etag) {
        res.writeHead(304, headers);
        res.end();
        return;
    }

    const data = fs.readFileSync(info.abs);
    const ext = path.extname(filePath);

    if (status === 404) {
        res.writeHead(404, headers);
        res.end(data);
        return;
    }

    if (req.method === 'HEAD') {
        headers['Content-Length'] = data.length;
        res.writeHead(200, headers);
        res.end();
        return;
    }

    if (COMPRESSIBLE.has(ext) && data.length > 1400 && (req.headers['accept-encoding'] || '').includes('gzip')) {
        const key = `${filePath}-${data.length}`;
        let gz = gzipCache.get(key);
        if (!gz) {
            gz = zlib.gzipSync(data);
            gzipCache.set(key, gz);
        }
        headers['Content-Encoding'] = 'gzip';
        headers['Content-Length'] = gz.length;
        res.writeHead(200, headers);
        res.end(gz);
        return;
    }

    headers['Content-Length'] = data.length;
    res.writeHead(200, headers);
    res.end(data);
}

const ALLOWED_EXTS = new Set(Object.keys(MIME));

const server = http.createServer((req, res) => {
    const method = req.method || 'GET';
    if (method !== 'GET' && method !== 'HEAD') {
        res.writeHead(405, { Allow: 'GET, HEAD' });
        res.end();
        return;
    }

    let pathname;
    try {
        pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    } catch {
        res.writeHead(400);
        res.end();
        return;
    }

    if (pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json', ...SECURITY_HEADERS });
        res.end('{"status":"ok"}');
        return;
    }

    if (pathname === '/') pathname = '/index.html';
    if (pathname === '/favicon.ico') pathname = '/assets/img/favicon.svg';

    const filePath = pathname.slice(1);
    const ext = path.extname(filePath);
    if (!ALLOWED_EXTS.has(ext) || filePath.includes('..')) {
        res.writeHead(404);
        res.end('Not found');
        return;
    }

    serve(req, res, filePath, 200);
});

server.listen(PORT, HOST, () => {
    console.log(`Portfolio (Grok) · serving http://${HOST}:${PORT}`);
});

function shutdown(signal) {
    console.log(`${signal} received, shutting down gracefully...`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));