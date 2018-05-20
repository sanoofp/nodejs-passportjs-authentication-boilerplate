const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

const indexRoute = require('./routes/index');
const userRoute = require('./routes/user');

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//express-hanldebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use('/', indexRoute);
app.use('/user', userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started.'));