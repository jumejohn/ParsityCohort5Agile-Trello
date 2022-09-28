var express = require('express');
var router = express.Router();
const passport = require('passport');
const passportService = require('../authentication/passport');

const Auth = require('../controllers/auth');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// requireSignin

router.post('/auth/signin', requireSignin, Auth.signin);
router.get('/auth/signout', (req, res) => {
  req.logout();
  res.send('Logged out!');
});
// router.post('/auth/signin', Auth.signin);
module.exports = router;
