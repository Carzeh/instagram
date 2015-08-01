var api = require('instagram-node').instagram();

api.use({
    client_id: "602472d98f7b47f8ba3d71e7e29e486f",
    client_secret: "793f8682c4f845a1a668b9fbc5ac20f6"
});

var redirect_uri = 'http://192.168.59.103/handleauth';
var maxes = {};

function handleRecentMedia(err, medias, pagination, remaining, limit) {

    // For each media check the like count and update variable via function with max likes
    for (var i = 0; i < medias.length; i++) {

        maxes[medias[i].user.username] = maxes[medias[i].user.username] || {'maxLikes' : 0};

        if (medias[i].likes.count > maxes[medias[i].user.username].maxLikes) {
            maxes[medias[i].user.username].maxLikes = medias[i].likes.count;
            maxes[medias[i].user.username].maxLink = medias[i].images.low_resolution.url;
        }
    }

    // Follow pagination link
    if (pagination.next) {
        pagination.next(handleRecentMedia); // Will get second page results
    } else {
        return maxes;
    }
}

exports.authorize_user = function(req, res) {
    res.redirect(api.get_authorization_url(redirect_uri, { scope: ['relationships'], state: 'a state' }));
};

exports.handleauth = function(req, res) {
    api.authorize_user(req.query.code, redirect_uri, function(err, result) {
        if (err) {
            res.send("Didn't work");
        } else {
            // Setup Access Token
            api.use({ access_token: result.access_token });

            // Get list of followed users
            var mediaLink = api.user_follows(result.user.id, function(err, users, pagination, remaining, limit) {
                for (var i = 0; i < users.length; i++) {
                    api.user_media_recent(users[i].id, handleRecentMedia);
                }
            });
            return res.send(mediaLink);
        }
    });
};

module.exports = exports;
