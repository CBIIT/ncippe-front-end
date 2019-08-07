const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./src/data/mockData.json');
const middlewares = jsonServer.defaults({
  static: __dirname + '/build/'
});
const singularMiddleware = require('./server_singular')

const port = process.env.PORT || 5000;

server.use(middlewares)
server.use(singularMiddleware)
server.use(jsonServer.rewriter({
  '/api/users/:userName': '/users?userName=:userName&singular=1',
  '/api/*': '/$1'
}));
server.use(router)

server.listen(port,(req, res) => console.log( `server listening on port: ${port}`));