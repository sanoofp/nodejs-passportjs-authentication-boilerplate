const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { check, validationResult } = require('express-validator/check');
// const passportConfig = require('../config/passport');
const { ensureAuthentication, generateProfileImage } = require('../config/auth');

router.get('/signin', (req, res) => {
  res.render('signin')
})
router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signin', (req, res, next) => {
  
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/user/signin',
    failureFlash: true
  })(req, res, next);
});

router.post('/signup', (req, res) => {
  req.assert('username', 'Username is required').notEmpty();
  req.assert('email', 'Enter a valid email address').isEmail();
  req.assert('password', 'Password must be atleast 6 charecters').isLength({ min: 6 });
  const errors = req.validationErrors();

  if(errors){
    req.flash('errors', errors)
    return res.render('signup', {
      username: req.body.username,
      email: req.body.email
    })
  }

  User.findOne({
    email: req.body.email
  })
  .then(user => {
    if(user) {
      req.flash('errors', {msg: `Already a user with Email ${req.body.email}`});
      return res.redirect('/user/signin');
    }

    const newUser = new User({
      username: req.body.username.toLowerCase(),
      email: req.body.email.toLowerCase(),
      password: req.body.password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        
        newUser.password = hash;
        newUser.profileImage = generateProfileImage(newUser.email);

        newUser.save()
          .then(user => {
            req.flash('success', {msg: 'Your account has been registered.'});
            return res.redirect('/user/signin');
          })
          .catch(err => {
            console.log(err);
            return
          });
      });
    });

  });

});

router.get('/signout', ensureAuthentication, (req, res) => {
  req.logout();
  req.flash('success', { msg: 'You are logged out.' });
  res.redirect('/');
})

module.exports = router;
