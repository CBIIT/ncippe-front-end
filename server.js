const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./src/data/mockData.json');
const middlewares = jsonServer.defaults({
  static: __dirname + '/build/'
});
const singularMiddleware = require('./server_singular')
const getUserMiddleware = require('./server_getUser')

const port = process.env.PORT || 5000;

server.use(middlewares)
server.use(getUserMiddleware)
server.use(singularMiddleware)
server.use(jsonServer.rewriter({
  "/api/participants/:uuid": "/participants?uuid=:uuid&singular=1",
  "/api/providers/:uuid": "/providers?uuid=:uuid&singular=1",
  "/api/crcs/:uuid": "/crcs?uuid=:uuid&singular=1",
  "/api/bsscs/:uuid": "/bsscs?uuid=:uuid&singular=1",
  "/api/mochaAdmins/:uuid": "/mochaAdmins?uuid=:uuid&singular=1",
  "/api/admins/:uuid": "/admins?uuid=:uuid&singular=1",
  "/api/reports/:uuid": "/reports?fileGUID=:uuid&singular=1",
  "/api/otherDocuments/:uuid": "/otherDocuments?fileGUID=:uuid&singular=1",
  "/api/*": "/$1"
}));
server.use(router)

server.listen(port,(req, res) => console.log( `server listening on port: ${port}`));