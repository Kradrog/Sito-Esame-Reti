const http = require('http');
const fs = require('fs');
const path = require('path');
const porta = 3000;

const server = http.createServer((req, res) => {
  // Costruisci il percorso del file richiesto
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  const extname = path.extname(filePath);
  let contentType = 'text/html';

  // Imposta il Content-Type in base all'estensione del file
  switch (extname) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  // Leggi il file richiesto
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File non trovato');
      } else {
        res.writeHead(500);
        res.end('Errore nel caricare il file');
      }
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(porta, () => {
  console.log(`Server in ascolto su http://localhost:${porta}`);
});