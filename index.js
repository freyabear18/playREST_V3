// Freya Avalon Orla Mann -- Application's main server

const methodOverride = require('method-override');
const { urlencoded } = require('express');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
const generateUsers = require('./utils/generate_users')

const games = require(__dirname + '/routes/games');
const auth = require(__dirname + '/routes/auth');
const public = require(__dirname + '/routes/public');

mongoose.connect('mongodb://mymongodb/playrest_v3',{
    useNewUrlParser: true
});

let app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

generateUsers.saveUsers();

//auth stuff
app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.set('view engine', 'njk');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(methodOverride(function(req, res){
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/public', express.static(__dirname + '/public'));

app.use('/', public);
app.use('/admin', games);
app.use('/auth', auth);

app.listen(8080);