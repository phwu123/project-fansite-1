// mdn: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework

const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000
http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html'
  }
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

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if(error.code == 'ENOENT') {
        // fs.readFile('./404.html', function(error, content) {
        //     res.writeHead(404, { 'Content-Type': 'text/html' });
        //     res.end(content, 'utf-8');
        // });
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
      } else {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}).listen(port, () => {
  console.log('listening on port ', port)
})