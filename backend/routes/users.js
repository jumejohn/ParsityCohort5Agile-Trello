var express = require('express');
var router = express.Router();
const User = require('../models/User')



/* GET all users listing. */
router.get('/', function(req, res, next) {
  User.find().exec((err, users) => {
    if(err) return next(err)
    res.status(200).send(users).end()
  })
});

/* GET user by id */
router.get('/:userId', function(req, res, next) {
  const id = req.params.userId
  User.findById(id).exec((err, user) => {
    if(err) return next(err)
    res.status(200).send(user).end()
  })
});

/* POST add new user */
router.post('/', function(req, res, next) {
  const {username, firstname, lastname, email, phone, avatarUrl, contacts, organization, password} = req.body
  const newUser = new User({username, firstname, lastname, email, phone, avatarUrl, contacts, organization, password}).save((err) => {
    if(err) return next(err)
    res.status(204).json(newUser)
    res.end()
  })
})

/* DELETE remove user by id */
router.delete('/:userId', function(req, res, next) {
  const id = req.params.userId
  User.findByIdAndDelete(id).exec((err) => {
    if(err) return next(err)
    res.send("User has been successfully removed from the database").status(204).end()
  })
})



module.exports = router;
