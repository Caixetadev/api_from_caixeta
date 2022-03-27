const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');
let database   = {username: ``, password: ``, db: ``};

module.exports = () => {
  const app = express();

  app.set('port', process.env.PORT || config.get('server.port'));
  database = config.get('mysql') || undefined;
  app.use(bodyParser.json());

  return {app, database};
};