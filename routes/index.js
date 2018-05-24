const express = require('express');
const router = express.Router();
const { ensureAuthentication } = require('../config/auth');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/dashboard', ensureAuthentication, (req, res) => {
  res.render('dashboard');
});

module.exports = router;