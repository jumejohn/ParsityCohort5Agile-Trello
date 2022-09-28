const jwt = require('jwt-simple');
const User = require('../models/User');

const tokenForUser = (user) => {
  // console.log(user);
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
  // user.body
  res.send({
    token: tokenForUser(req.user),
    // userID: req.user._id,
  });
};

exports.currentUser = function (req, res) {
  console.log('cur_req: ', req.user);
  const user = {
    username: req.user.username,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    email: req.user.email,
    phone: req.user.phone,
    avatarUrl: req.user.avatarUrl,
    organization: req.user.organization,
    token: tokenForUser(req.user),
  };

  res.send(user);
};
