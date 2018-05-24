const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');

router.get('/signin', (req, res) => {
  res.render('signin')
})
router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signin', (req, res) => {
  res.send('sdad')
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
    username: req.body.username
  })
  .then(user => {
    if(user) {
      req.flash('errors', {msg: `Already a user with username ${req.body.username}`});
      return res.redirect('/user/signin');
    }

    const newUser = new User({
      username: req.body.username.toLowerCase(),
      email: req.body.email,
      password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;
        newUser.save()
          .then(user => {
            req.flash('success', 'Your account has been registered.');
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

module.exports = router;
