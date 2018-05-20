const express = require('express');

const app = express();

const indexRoute = require('./routes/index');

app.use('/', indexRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started.'));