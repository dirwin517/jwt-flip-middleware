/**
 * Created by daniel.irwin on 6/9/16.
 */
module.exports = (function JWTFlipMiddleware() {

    var jwt = require('jsonwebtoken');

    return function jwtFlip(secret, options) {
        if(!options){
            var defaultDecode = 'decodeMe';
            options = { jwt : { algorithm : 'HS256' }, property : defaultDecode};
        }
        return function jwtFlip(req, res, next) {
            var decodeBy = options.property || defaultDecode;
            if (req.body && typeof req.body[decodeBy] === 'string') {
                jwt.verify(req.body[decodeBy], secret, function(err, decoded){
                    if(err){
                        return next();
                    }
                    res.json(decoded);
                });
            }
            else if (req.body && typeof req.body[decodeBy] === 'undefined') {
                jwt.sign(req.body, secret, options, function(err, encoded){
                    if(err){
                        next();
                    }
                    res.send(encoded);
                });
            }
            else {
                next();
            }
        };
    };
})();