const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const indexRoute = require('./routes/index');

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started.'));