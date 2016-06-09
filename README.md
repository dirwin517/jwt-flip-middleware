# jwt-flip-middleware
Express middleware, which if body is string converts from JWT => JSON if JSON => JWT


How do I use it?

    var jwt = require('./index')('mysecret', options);
        options is an object but optional!
        options = { jwt : {}, property : "decodeMe" } //defaults to decodeMe

    app.post('/data', function(req, res, next){
        console.log('data');
        jwt(req, res, next);
    });

DONE!

    now if you post to /data with json without your property, it will be JWT encoded
    { "anythingBut-decodeMe" : "hello world" }

    if you post /data with json with your property it will be decoded
    { "decodeMe" : "JWT-Token"}