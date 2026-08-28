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
    '.woff2': 'font/woff2',
    '.webmanifest': 'application/manifest+json; charset=utf-8'
};

const SECURITY_HEADERS = {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'sha256-VdG3dKqVSyuB4RubHZeh0vx7LiIF71Ao5g7Lwo9RVjU=' 'sha256-MYZtYArdfY7je2JUplLvF9LoHyHCjJC+rvqvlZhyluo='; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    'X-XSS-Protection': '0',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-site',
    'X-Permitted-Cross-Domain-Policies': 'none'
};

// HSTS only makes sense behind TLS — safe to send always, browsers ignore on plain HTTP.
// Enabled in production to cover custom domain with TLS termination at the edge.
if (process.env.NODE_ENV === 'production') {
    SECURITY_HEADERS['Strict-Transport-Security'] = 'max-age=63072000; includeSubDomains; preload';
}

const COMPRESSIBLE = new Set(['.html', '.css', '.js', '.json', '.svg', '.txt', '.xml', '.webmanifest']);
const gzipCache = new Map();
const MAX_GZIP_CACHE_SIZE = 50;

function cacheControlFor(filePath, reqUrl) {
    if (filePath.endsWith('index.html') || filePath.endsWith('404.html')) return 'no-cache';
    // Versioned assets (?v=xxx) are immutable — safe to cache for a year.
    const isVersioned = reqUrl ? reqUrl.includes('?v=') || reqUrl.includes('&v=') : false;
    if (isVersioned && /\.(css|js|png|jpg|jpeg|webp|svg|woff2)$/.test(filePath)) {
        return 'public, max-age=31536000, immutable';
    }
    if (/\.(css|js)$/.test(filePath)) return 'no-cache';
    if (/\.(png|jpg|jpeg|webp|svg|ico|woff2|pdf)$/.test(filePath)) return 'public, max-age=604800, immutable';
    return 'public, max-age=604800';
}

function loadFile(filePath) {
    const abs = path.resolve(ROOT, filePath);
    // Ensure resolved path stays inside ROOT to prevent traversal via encoded or absolute paths.
    if (!abs.startsWith(ROOT + path.sep) && abs !== ROOT) return null;
    if (!fs.existsSync(abs)) return null;
    let stat;
    try {
        stat = fs.statSync(abs);
    } catch {
        return null;
    }
    if (!stat.isFile()) return null;
    return { abs, size: stat.size, mtime: stat.mtime.toUTCString(), etag: `"${stat.mtimeMs}-${stat.size}"` };
}

function serve(req, res, filePath, status, reqUrl) {
    const info = loadFile(filePath);
    if (!info) {
        if (filePath !== '404.html' && fs.existsSync(path.join(ROOT, '404.html'))) {
            serve(req, res, '404.html', 404, reqUrl);
        } else {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS });
            res.end('Internal server error');
        }
        return;
    }

    const ct = MIME[path.extname(filePath)] || (filePath === 'CNAME' ? 'text/plain; charset=utf-8' : 'application/octet-stream');
    const headers = {
        'Content-Type': ct,
        'Cache-Control': cacheControlFor(filePath, reqUrl),
        'Vary': 'Accept-Encoding',
        'ETag': info.etag,
        'Last-Modified': info.mtime,
        ...SECURITY_HEADERS
    };

    if (status === 404) {
        headers['Cache-Control'] = 'no-cache';
    }

    const ifNoneMatch = req.headers['if-none-match'];
    if (ifNoneMatch === info.etag || ifNoneMatch === '*') {
        // 304 must not include Content-Length or body
        res.writeHead(304, headers);
        res.end();
        return;
    }

    const ifModifiedSince = req.headers['if-modified-since'];
    if (ifModifiedSince && !ifNoneMatch) {
        const since = Date.parse(ifModifiedSince);
        const mtime = Date.parse(info.mtime);
        if (!Number.isNaN(since) && !Number.isNaN(mtime) && mtime <= since) {
            res.writeHead(304, headers);
            res.end();
            return;
        }
    }

    const data = fs.readFileSync(info.abs);
    const ext = path.extname(filePath);

    if (status === 404) {
        if (req.method === 'HEAD') {
            headers['Content-Length'] = data.length;
            res.writeHead(404, headers);
            res.end();
            return;
        }
        res.writeHead(404, headers);
        res.end(data);
        return;
    }

    if (req.method === 'HEAD') {
        // For HEAD, still compute gzip length if client accepts it to keep Content-Length accurate.
        if (COMPRESSIBLE.has(ext) && data.length > 1400 && (req.headers['accept-encoding'] || '').includes('gzip')) {
            const key = `${filePath}-${data.length}`;
            let gz = gzipCache.get(key);
            if (!gz) {
                gz = zlib.gzipSync(data);
                if (gzipCache.size >= MAX_GZIP_CACHE_SIZE) {
                    const firstKey = gzipCache.keys().next().value;
                    gzipCache.delete(firstKey);
                }
                gzipCache.set(key, gz);
            }
            headers['Content-Encoding'] = 'gzip';
            headers['Content-Length'] = gz.length;
            res.writeHead(200, headers);
            res.end();
            return;
        }
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
            if (gzipCache.size >= MAX_GZIP_CACHE_SIZE) {
                const firstKey = gzipCache.keys().next().value;
                gzipCache.delete(firstKey);
            }
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
const PUBLIC_FILES = new Set(['index.html', '404.html', 'robots.txt', 'sitemap.xml', 'site.webmanifest', 'CNAME', 'humans.txt']);
const PUBLIC_DIRS = ['assets/', 'cv/', '.well-known/'];

function isPublic(filePath) {
    return PUBLIC_FILES.has(filePath) || PUBLIC_DIRS.some((dir) => filePath.startsWith(dir));
}

const server = http.createServer((req, res) => {
    const method = req.method || 'GET';
    if (method !== 'GET' && method !== 'HEAD') {
        res.writeHead(405, { Allow: 'GET, HEAD', ...SECURITY_HEADERS });
        res.end();
        return;
    }

    let url;
    try {
        url = new URL(req.url, 'http://localhost');
    } catch {
        res.writeHead(400, { ...SECURITY_HEADERS });
        res.end();
        return;
    }

    let pathname;
    try {
        pathname = decodeURIComponent(url.pathname);
    } catch {
        res.writeHead(400, { ...SECURITY_HEADERS });
        res.end();
        return;
    }

    const originalUrl = req.url || '/';

    if (pathname === '/health') {
        const body = '{"status":"ok"}';
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store',
            'Content-Length': Buffer.byteLength(body),
            ...SECURITY_HEADERS
        });
        if (method === 'HEAD') {
            res.end();
            return;
        }
        res.end(body);
        return;
    }

    if (pathname === '/') pathname = '/index.html';
    if (pathname === '/favicon.ico') pathname = '/assets/img/favicon.svg';

    const filePath = pathname.slice(1);
    const ext = path.extname(filePath);
    // Hard path-traversal check via resolved path, plus allowlist checks.
    // CNAME has no extension but must be allowed — ALLOWED_EXTS check is skipped for it (empty ext).
    const resolved = path.resolve(ROOT, filePath);
    const insideRoot = resolved === ROOT || resolved.startsWith(ROOT + path.sep);
    const extAllowed = ext === '' ? PUBLIC_FILES.has(filePath) : ALLOWED_EXTS.has(ext);
    if (!insideRoot || filePath.includes('..') || !isPublic(filePath) || !extAllowed) {
        serve(req, res, '404.html', 404, originalUrl);
        return;
    }

    serve(req, res, filePath, 200, originalUrl);
});

const MAX_HEADERS_TIMEOUT_MS = 30_000;
const MAX_REQUEST_TIMEOUT_MS = 60_000;
const KEEP_ALIVE_TIMEOUT_MS = 5_000;

server.headersTimeout = MAX_HEADERS_TIMEOUT_MS;
server.requestTimeout = MAX_REQUEST_TIMEOUT_MS;
server.keepAliveTimeout = KEEP_ALIVE_TIMEOUT_MS;

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
