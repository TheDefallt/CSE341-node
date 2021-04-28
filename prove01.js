const http = require('http');

const port = process.env.port || 3000;

const routes = require('./prove01-routes.js');

const server = http.createServer(routes);

server.listen(port);