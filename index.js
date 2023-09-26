const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const connect = require('./utils/connect');

require('dotenv').config();
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/api`, require('./routes'));

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  connect();
});
