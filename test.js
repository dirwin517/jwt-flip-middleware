/**
 * Created by daniel.irwin on 6/9/16.
 */
var express = require('express');

var app = express();

var bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var jwt = require('./index')('mysecret');


app.post('/data', function(req, res, next){
    console.log('data');
    jwt(req, res, next);
});

app.listen(1337, function () {
    console.log('http://localhost:1337');
});