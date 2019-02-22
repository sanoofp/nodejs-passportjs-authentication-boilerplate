const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const keys = require('../keys/db');

passport.use(new LocalStrategy({
  usernameField: 'email'
}, function (email, password, done) {
  User.findOne({
    email: email.toLowerCase()
  })
    .then(user => {
      if (!user) {
        return done(null, false, { message: `No user found with email ${email}` });
      }
      if(!user.password) {
        // 2nd parameter > user / false
        return done(null, false, { message: "User is not connected via Email" });
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          throw err;
        } 

        if (isMatch) {
          return done(null, user)
        } else {
          return done(null, false, {message: 'Incorrect password'});
        }

      });
    });
}));

passport.use(new GithubStrategy({
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret,
    callbackURL: "/auth/github/callback"
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({
      githubID: profile.id
    })
    .then(existinguser => {
      if(existinguser) {
        return done(null, existinguser)
      }
      const newUser = new User({
        username: profile.username,
        githubID: profile.id,
        email: profile._json.email, 
        profileImage: profile._json.avatar_url
      });

      newUser.save()
        .then(user => done(null, user));
    });

  }
));


passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User
    .findById(id, function (err, user) {
      done(err, user);
    });
});