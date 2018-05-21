const router = require('express').Router();

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
  res.send('UP')
});

module.exports = router;
