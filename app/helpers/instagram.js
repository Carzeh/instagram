var api = require('instagram-node').instagram();

api.use({
    client_id: "602472d98f7b47f8ba3d71e7e29e486f",
    client_secret: "793f8682c4f845a1a668b9fbc5ac20f6"
});

var redirect_uri = 'http://192.168.59.104/handleauth';

exports.authorize_user = function(req, res) {
    res.redirect(api.get_authorization_url(redirect_uri, { scope: ['relationships'], state: 'a state' }));
};

exports.handleauth = function(req, res) {
    api.authorize_user(req.query.code, redirect_uri, function(err, result) {
        if (err) {
            console.log(err.body);
            res.send("Didn't work");
        } else {
            console.log(result.user.id);
            api.use({ access_token: result.access_token });
            api.user_follows(result.user.id, function(err, users, pagination, remaining, limit) {
                var firstUser = users[0];

                api.user_media_recent(firstUser.id, function(err, medias, pagination, remaining, limit) {
                    res.send(JSON.stringify(medias[0].likes.count));
                });
            });
        }
    });
};


module.exports = exports;
