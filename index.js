// Rquired packages
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Loads .env file contents into process.env
dotenv.config();

// Define routes
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const uploadRoute = require('./routes/upload');
const conversationsRoute = require('./routes/conversations');
const messagesRoute = require('./routes/messages');

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));

// Establish MongoDB connection
// slow connection why seems to be caused by; useUnifiedTopology: true
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log('Connected to MongoDB');
  }
);

// if using images path, don't expect requests instead goto dir
app.use('/images', express.static(path.join(__dirname, '/public/images')));
// Use routes
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/conversations', conversationsRoute);
app.use('/api/messages', messagesRoute);

app.get('/', (req, res) => {
  res.send('Welcome to homepage');
});

// Run app on port 8800
app.listen(8800, () => {
  console.log('Backend server is running');
});
