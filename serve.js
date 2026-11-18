// เซิร์ฟเวอร์ไฟล์ static สำหรับดูตัวอย่างในเครื่อง: node serve.js แล้วเปิด http://localhost:5179
const http = require("http"), fs = require("fs"), path = require("path");
const root = __dirname, port = 5180;
const types = { ".html": "text/html; charset=utf-8", ".webp": "image/webp", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".jpg": "image/jpeg", ".pdf": "application/pdf", ".webm": "video/webm", ".mp4": "video/mp4", ".json": "application/json", ".glb": "model/gltf-binary", ".mjs": "text/javascript" };
http.createServer((req, res) => {
  const p = path.normalize(path.join(root, decodeURIComponent(req.url.split("?")[0]) === "/" ? "index.html" : decodeURIComponent(req.url.split("?")[0])));
  if (!p.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.readFile(p, (err, data) => {
    if (err) { res.writeHead(404); return res.end("not found"); }
    res.writeHead(200, { "Content-Type": types[path.extname(p)] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(data);
  });
}).listen(port, () => console.log(`http://localhost:${port}`));
