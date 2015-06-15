var jwt = require('jwt-simple');
var activeDirectory = require('activedirectory');
var config = require('../config/activedirectory.json');
var ad = new activeDirectory(config.main);


var auth = {
    login: function (req, res) {

        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username == '' || password == '') {
            invalidResponse(req, res, err);
            return;
        }

        ad.authenticate(username + config.domainName, password, function(err, auth){
 
            if (err || !auth) {
                invalidResponse(req, res, err);
            } else {
                ad.findUser(username, function(err, data){
                    res.json(data);
                });
            }
            return;
        });
    }
}

function invalidResponse(req, res, err){

    console.log('Error: ' + JSON.stringify(err));

    res.status(401);
    res.json({
        "status": 401,
        "message": "Invalid credentials"
    });
}

// private method
function genToken(user) {
    var expires = expiresIn(7); // 7 days
    var token = jwt.encode({
        exp: expires
    }, require('../config/secret')());

    return {
        token: token,
        expires: expires,
        user: user
    };
}
function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;
