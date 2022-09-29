var express = require('express');
var router = express.Router();

const passport = require('passport');
const passportService = require('../authentication/passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const User = require('../models/User');

/* GET all users listing. */
router.get('/', requireAuth, function (req, res, next) {
  User.find().exec((err, users) => {
    if (err) return next(err);
    res.status(200).send(users).end();
  });
});

/* GET user by id */
router.get('/:userId', requireAuth, function (req, res, next) {
  const id = req.params.userId;
  User.findById(id)
    .populate('organization')
    .exec((err, user) => {
      if (err) return next(err);
      res.status(200).send(user).end();
    });
});

/* POST add new user */
router.post('/', requireAuth, function (req, res, next) {
  const {
    username,
    firstname,
    lastname,
    email,
    phone,
    avatarUrl,
    contacts,
    organization,
    password,
  } = req.body;
  const newUser = new User({
    username,
    firstname,
    lastname,
    email,
    phone,
    avatarUrl,
    contacts,
    organization,
    password,
  }).save((err) => {
    if (err) return next(err);
    res.status(204).json(newUser);
    res.end();
  });
});

/* DELETE remove user by id */
router.delete('/:userId', requireAuth, function (req, res, next) {
  const id = req.params.userId;
  User.findByIdAndDelete(id).exec((err) => {
    if (err) return next(err);
    res
      .send('User has been successfully removed from the database')
      .status(204)
      .end();
  });
});

router.put("/:userId", requireAuth, async function (req, res, next) {
  const userId = req.params.userId
  const {
    username,
    firstname,
    lastname,
    email,
    phone,
    avatarUrl,
    contacts,
    organization,
    password,
  } = req.body;
  const update = {
    username: username,
    firstname: firstname,
    lastname: lastname,
    email: email,
    phone: phone,
    avatarUrl: avatarUrl,
    contacts: contacts,
    organization: organization,
    password: password
  }
  const filter = { _id: userId}
  const updateUser = await User.findOneAndUpdate(filter, update, {new: true})
  res.send(updateUser)
  res.status(200)
})

module.exports = router;
