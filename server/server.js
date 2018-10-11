const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath))
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};