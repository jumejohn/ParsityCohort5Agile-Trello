const passport = require('passport');
const User = require('../models/User');
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        // clientID: process.env.GOOGLE_CLIENT_ID,
        clientID:
          '582237377087-sn7fc2t5k6m0b3tj55bja3svtfdqkr5l.apps.googleusercontent.com',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8000/auth/google/callback',
        passReqToCallback: true,
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ 'google.id': profile.id }).then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            // new User({
            //   googleId: profile.id,
            //   username: profile.displayName,
            //   email: profile.emails[0].value,
            // })
            new User({
              method: 'google',
              google: {
                id: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
              },
            })
              .save()
              .then((user) => done(null, user));
          }
        });
      }
    )
  );
};

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      passport.use(
        new JwtStrategy(
          {
            jwtFromRequest: ExtractJwt.fromHeader('authorization'),
            secretOrKey: 'helloworld',
          },
          async (jwtPayload, done) => {
            try {
              const user = jwtPayload.user;
              done(null, user);
            } catch (error) {
              done(error, false);
            }
          }
        )
      )
    )
  );
};
