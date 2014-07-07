var express = require('express')
, session = require('express-session')
, load = require('express-load')
, path = require('path')
, logfmt = require('logfmt')
, config = require('./config.json')
, favicon = require('static-favicon')
, cookieParser = require('cookie-parser')
, methodOverride = require('method-override')
, compress = require('compression')
, bodyParser = require('body-parser')
, redis = require('./lib/redis_connect')
, ExpressStore = redis.getExpressStore()
, app = express();

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.use(logfmt.requestLogger());
app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  secret: config.SECRET,
  key: config.KEY,
  store: new ExpressStore({ client: redis.getClient(), prefix: config.KEY })
}));
app.use(express.static(path.join(__dirname, 'public')/*, config.MAX_AGE*/));
app.use(compress(config.GZIP_LVL));

load('models', { cwd: 'app' })
  .then('controllers')
  .then('routes')
  .into(app);

var port = Number(process.env.PORT || 3000);

app.listen(port, function(){
  console.log('running maremar application on port ' + port);
});

module.exports = app;
