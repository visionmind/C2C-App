const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');
const passportJWT = require('./middleware/passportJWT')();

app.use(cors());
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/muamua-api', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passportJWT.initialize());

app.use('/api/post', postRoutes);
app.use('/api/auth', passportJWT.authenticate(), authRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening');
});
