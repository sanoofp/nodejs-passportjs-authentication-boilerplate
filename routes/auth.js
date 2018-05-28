const router = require('express').Router();
const passport = require('passport');

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: "/user/signin" }), (req, res) => {
  console.log('USER ', req.user.id);
  res.redirect('/dashboard');
});

module.exports = router;