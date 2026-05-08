const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || 4173);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
};

function safePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split('?')[0]);
  const filePath = path.normalize(path.join(root, cleanPath === '/' ? 'index.html' : cleanPath));
  if (!filePath.startsWith(root)) return path.join(root, 'index.html');
  return filePath;
}

const server = http.createServer((req, res) => {
  const filePath = safePath(req.url || '/');
  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(filePath)] || 'application/octet-stream' });
    res.end(content);
  });
});

server.listen(port, () => {
  console.log(`Bharat FreightLink running at http://localhost:${port}`);
});
