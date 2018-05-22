const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

require('./models/User');
const indexRoute = require('./routes/index');
const userRoute = require('./routes/user');

//Mongoose
const db = require('./keys/db')
mongoose.connect(db.mongoUri)
.then(() => console.log('Connected to database'))
.catch(err => console.log(err));

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//express-hanldebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Express-session
app.use(session({
  secret: 'nodepassportsecret',
  resave: false,
  saveUninitialized: false,
}));

//passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRoute);
app.use('/user', userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started.'));