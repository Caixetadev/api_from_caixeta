const {app, database} = require('./config/express')();
const port = app.get('port');
const routes = require('./api/routes/routes')();
const conn = require('./config/mysql')(database)(database);
require('dotenv').config();

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});

routes.forEach((route) => {
  const method = route.method;
  if(method == `post`){
    app.post(route.route, function(req, res) {
      route.controller(conn, req, res);
    });
  } else if(method == `get`){
    app.get(route.route, function(req, res) {
      route.controller(conn, req, res);
    });
  }
})