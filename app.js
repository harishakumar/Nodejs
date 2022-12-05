const http = require('http');
const port = 3000;

const express = require("express");
const app = express();

app.use(express.json());

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Harish Kumar here...</h1>\n');
});

server.listen(port);
