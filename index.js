/**
 * Created by daniel.irwin on 6/9/16.
 */
module.exports = (function JWTFlipMiddleware() {

    var jwt = require('jsonwebtoken');

    return function jwtFlip(secret, options) {
        if(!options || !options.jwt){
            var defaultDecode = 'decodeMe';
            options = { jwt : { algorithm : 'HS256' }, property : defaultDecode};
        }
        return function jwtFlip(req, res, next) {
            var decodeBy = options.property || defaultDecode;
            var decodeByTypeOf = typeof  req.body[decodeBy];
            if (req.body && decodeByTypeOf === 'string') {
                jwt.verify(req.body[decodeBy], secret, function(err, decoded){
                    if(err){
                        return next();
                    }
                    res.json(decoded);
                });
            }
            else if (req.body && decodeByTypeOf === 'undefined') {
                jwt.sign(req.body, secret, options.jwt, function(err, encoded){
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