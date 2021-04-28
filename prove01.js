const http = require('http');

const routes = require('./prove01-routes.js');

const server = http.createServer(routes);

server.listen(process.env.PORT || 3000);