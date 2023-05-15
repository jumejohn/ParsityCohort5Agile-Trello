const jwt = require('jwt-simple');
const User = require('../models/User');
const keys = require('../config/keys');
const Organization = require('../models/Organization');

const tokenForUser = (user) => {
  // console.log(user);
  return jwt.encode(
    {
      sub: user.id,
      iat: Math.round(Date.now() / 1000),
      exp: Math.round(Date.now() / 1000 + 5 * 60 * 60),
    },
    keys.TOKEN_SECRET
  );
};

exports.signin = function (req, res, next) {
  // user.body
  res.send({
    token: tokenForUser(req.user),
    userID: req.user._id,
  });
};

exports.currentUser = function (req, res) {
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


exports.register = async function (req, res, next) {
  // validate frontend input
  const { username, password, firstName, lastName } = req.body;

  if (!username || !password || !firstName || !lastName) {
    return res.status(400).send({ success: false });
  }

  // email must be unique. I decided not to sent this to an alternate function for lower initial development time. It was easier to debug in the same function like this.
  const duplicateEmail = await User.findOne({ username }).then((user) => user);

  if (duplicateEmail) {
    return res.status(400).send({ success: false });
  }

  const userOrg = new Organization({
    orgName: username,
    orgOwner: firstName,
    orgBoards: [],
    orgMembers: [],
  })

  await userOrg
    .save()


  // create new user document from schema
  const newUser = new User({ username, firstName, lastName, organization: userOrg._id });

  // call password creation function from model
  newUser.setPassword(password);


  // save to database
  newUser
    .save()
    .then(() => {
      // return 201 if successful
      // generate a signed son web token with the contents of user object and return it in the response
      // const token = jwt.sign(newUser.toJSON(), keys.JWT_SECRET, {
      //   expiresIn: keys.JWT_EXPIRES_IN,
      // });

      const userWithToken = newUser.toJSON();

      return res.status(201).send({ success: true, user: userWithToken });
    })
    .catch((err) => res.status(500).send({ success: false }));
}