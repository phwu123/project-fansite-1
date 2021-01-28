// mdn: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework

const http = require('http');
// const fs = require('fs');
const fs = require('fs').promises;
const path = require('path');
const port = 3000
const {allowedRoutes} = require('./Routes.js')
http.createServer(async (req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html'
  }
  console.log('path', filePath)

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.mjs': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      // '.jpg': 'image/jpg',
      // '.gif': 'image/gif',
      // '.svg': 'image/svg+xml',
      // '.wav': 'audio/wav',
      // '.mp4': 'video/mp4',
      // '.woff': 'application/font-woff',
      // '.ttf': 'application/font-ttf',
      // '.eot': 'application/vnd.ms-fontobject',
      // '.otf': 'application/font-otf',
      // '.wasm': 'application/wasm'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  const allowedRoute = allowedRoutes.includes(filePath)
  let baseContent;
  if (allowedRoute) {
    try {
      const indexContent = await fs.readFile('./index.html');
      baseContent = indexContent;
    } catch (err) {
      console.log('failed to read index: ', err)
    }
  }
  
  try {
    const content = await fs.readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
  } catch (err) {
    console.log('no file or directory: ', err)
    if (allowedRoute) { // keep route
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(baseContent, 'utf-8');
    } else { // reroute to index
      res.writeHead(302, { 'Location': '.' })
      res.end()
    }
    // res.writeHead(404, { 'Content-Type': 'text/html' });
    // res.end();
  }
}).listen(port, () => {
  console.log('listening on port ', port)
})