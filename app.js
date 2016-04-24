var express    = require('express'),
    exphbs     = require('express-handlebars'),
    http       = require('http'),
    routes     = require('./js/routes'),
    bodyParser = require('body-parser'),
    session    = require('express-session'),
    app        = express(),
    ext        = 'handlebars';

app.engine(ext, exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', ext);
app.disable('etag'); //get statusCode 200

app.use(express.static('.'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'onetimesecretkey',
    resave: true,
    saveUninitialized: true
}));

app.use('/', routes);

http.createServer(app).listen(3000, function () {
    console.log('Server started successfully!');
});

module.exports = app;
