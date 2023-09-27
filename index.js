const express = require('express');
const cors = require('cors');
const connect = require('./utils/connect');

require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use('/api', require('./routes'));

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  connect();
});
