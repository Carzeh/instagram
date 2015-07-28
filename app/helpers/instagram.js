var api = require('instagram-node').instagram();

api.use({
    client_id: "602472d98f7b47f8ba3d71e7e29e486f",
    client_secret: "793f8682c4f845a1a668b9fbc5ac20f6"
});

var redirect_uri = 'http://192.168.59.103/handleauth';

exports.authorize_user = function(req, res) {
    res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
};

exports.handleauth = function(req, res) {
    api.authorize_user(req.query.code, redirect_uri, function(err, result) {
        if (err) {
            console.log(err.body);
            res.send("Didn't work");
        } else {
            console.log('Yay! Access token is ' + result.access_token);
            res.send('You made it!!');
        }
    });
};


module.exports = exports;
