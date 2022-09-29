const express = require('express');
const Organization = require('../models/Organization');
const { route } = require('./main');
const router = express.Router();

const passport = require('passport');
const passportService = require('../authentication/passport');
const requireAuth = passport.authenticate('jwt', { session: false });

// GET organization by id */

router.get('/:orgId', requireAuth, function (req, res, next) {
  const id = req.params.orgId;
  Organization.findById(id)
    .populate('orgBoards orgMembers')
    .exec((err, org) => {
      if (err) return next(err);
      res.status(200).send(org).end();
    });
});

router.put('/', requireAuth, function (req, res, next) {
  const userId = req.body.userId;
  const orgId = req.body.orgId;
  Organization.updateOne(
    { _id: orgId },
    { $push: { orgMembers: [userId] } },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.put('/remove-user', requireAuth, function (req, res, next) {
  const userId = req.body.userId;
  const orgId = req.body.orgId;
  Organization.findByIdAndUpdate(
    { _id: orgId },
    { $pull: { orgMembers: userId } },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
