const express = require('express');
const mongoose = require('mongoose');
const messages = require('./routes/message');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/caesarcodes', {
  useNewUrlParser: true,
});
app.use(express.json());

app.use('/', messages);

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
