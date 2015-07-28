var express = require('express');
var instagram = require('../helpers/instagram');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/handleauth', instagram.handleauth);
router.get('/authorize_user', instagram.authorize_user);

module.exports = router;
