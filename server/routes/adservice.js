var domainName = '@ad.i-bs.pl';
var config = {
/*    url: 'ldap://localhost',
    baseDN: 'dc=zs,dc=local',
    username: 'app.bind@zs.local',
    password: 'password', */
    
    url: 'ldap://192.168.1.254',
    baseDN: 'dc=ad,dc=i-bs,dc=pl',
    username: 'test1@ad.i-bs.pl',
    password: 'Password12',

    attributes: {
        user: ['departmentNumber', 'department', 'title', 'userPrincipalName', 'sAMAccountName', 'mail', 'employeeID', 'sn', 'givenName', 'initials', 'cn', 'displayName', 'comment', 'description'],
        group: ['cn']
    }
}





var activeDirectory = require('activedirectory');
var ad = new activeDirectory(config);

var fn = function(data){
  console.log(data);
}

var callbackData = function (err, data) {
  if (err) {
    console.log('Error: ' + JSON.stringify(err));
    return;
  }

  if (!data) {
    console.log('User not found.');
  } else {
    res.json({result: true});
    return data;
  }
}


var adAuth = function(req, res) {
  var username = req.body.username || '';
  var password = req.body.password || '';
  ad.authenticate(username + domainName, password, callbackData);
}

var find = function(username) {
  ad.findUser(username, callbackData);
}


var adService = {
  adAuth: adAuth,
  find: find
}


module.exports = adService;
