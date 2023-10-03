const express = require('express');
const cors = require('cors');
const connect = require('./utils/connect');

require('dotenv').config();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URI,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Authorization, Content-Type',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes'));

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  connect();
});
