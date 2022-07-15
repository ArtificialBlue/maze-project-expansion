//import {generate_maze} from './api/generator.js';

const http = require('http');
const express = require('express');
var app = express();

var generate_maze = require('./api/generator.js');
const hostname = '127.0.0.1';
const port = 3000;


app.all('/', function(req, res) {
  res.send('Hello World');
})

app.all('/api/:size', (req, res) => {
  //res.send(req.params);
  res.send(generate_maze(parseInt(req.params.size),parseInt(req.params.size)) + "\n");
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});