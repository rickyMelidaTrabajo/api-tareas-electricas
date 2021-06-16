const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    key: 'user',
    secret: 'sacdvfnnfvf1',
    resave: true,
    saveUninitialized: true
}));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const electricTask = require('./routes/routes');

app.use('/api', electricTask);

module.exports = app;
