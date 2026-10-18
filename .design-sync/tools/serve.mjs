// Minimal static server for the port-verification tools. `routes` maps a URL
// prefix to a directory or a single file; the first matching prefix wins.
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

const TYPES = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.avif': 'image/avif', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
};

export function serve(routes) {
  const server = createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    for (const [prefix, target] of routes) {
      if (!url.startsWith(prefix)) continue;
      let p = statSync(target, { throwIfNoEntry: false })?.isFile() ? target : join(target, url.slice(prefix.length));
      if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
      if (!existsSync(p)) continue;
      res.writeHead(200, { 'content-type': TYPES[extname(p)] ?? 'application/octet-stream' });
      return res.end(readFileSync(p));
    }
    res.writeHead(404);
    res.end();
  }).listen(0, '127.0.0.1');
  return new Promise((ok) => server.on('listening', () => ok({ origin: `http://127.0.0.1:${server.address().port}`, close: () => server.close() })));
}
