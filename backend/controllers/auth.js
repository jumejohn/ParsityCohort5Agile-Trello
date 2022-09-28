const jwt = require('jwt-simple');
const User = require('../models/User');

const tokenForUser = (user) => {
  return jwt.encode(
    {
      sub: user.id,
      iat: Math.round(Date.now() / 1000),
      exp: Math.round(Date.now() / 1000 + 5 * 60 * 60),
    },
    'helloWorld'
  );
};

exports.signin = function (req, res, next) {
  console.log(req.user._id);
  res.send({
    token: tokenForUser(req.body),
    userID: req.user._id,
  });
};

exports.currentUser = function (req, res) {
  const user = {
    username: req.user.username,
    token: tokenForUser(req.user),
  };

  res.send(user);
};
