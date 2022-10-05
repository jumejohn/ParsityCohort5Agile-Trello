var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../authentication/google')(passport);

router
  .get(
    '/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
  )

  .get(
    '/auth/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
      jwt.sign(
        { user: req.user },
        'secretKey',
        { expiresIn: '1h' },
        (err, token) => {
          if (err) {
            return res.json({ token: null });
          }
          res.json({ token });
        }
      );
      res.redirect('/profile/');
    }
  )

  .get(
    '/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
      res.send('Welcome');
    }
  );

module.exports = router;
