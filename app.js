/* jshint esnext: true */

var express = require('express'),
    exphbs = require('express-handlebars'),
    http = require('http'),
    app = express(),
    ext = 'handlebars';

app.engine(ext, exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', ext);
app.use(express.static('.'));

app.get('/index', (req, res) => {
    res.render('index', { title: 'Index - 30 STF Test' });
});

http.createServer(app).listen(3000, () => {
    console.log('Server started successfully!');
});
