const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = function(passport){
  passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({
      username: username.toLowerCase()
    })
    .then(user => {
      if(!user) {
        return done(null, false, { message: `No user found with username ${username}` })
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch){
          return done(null, user)
        } else {
          return done(null, false, { message: 'Incorrect password' });
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    return done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  
}