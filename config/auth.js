module.exports = {
  ensureAuthentication: function(req, res, next) {
    if(req.isAuthenticated()) {
      return next()
    }
    req.flash('errors', { msg: 'You need to logged in' });
    res.redirect('/user/signin');
  }
}