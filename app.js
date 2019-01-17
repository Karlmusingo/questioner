// Set up the express app
var express = require('express');
var bodyParser = require('body-parser');
var db = require('./Server/models/db');

const app = express();
const router = require('./Server/routes/routes');

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//get all meetups
app.use('/api/v1/', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
module.exports = app;
