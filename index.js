// Rquired packages
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

// Define routes
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

// Loads .env file contents into process.env
dotenv.config();

const start = new Date().getTime();
// Establish MongoDB connection
// slow connection why seems to be caused by; useUnifiedTopology: true
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to MongoDB');
  const stop = new Date().getTime();
  console.log('Took this long: ', (stop - start) / 1000);
});

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));

// Use routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
  res.send('Welcome to homepage');
});

// Run app on port 8800
app.listen(8800, () => {
  console.log('Backend server is running');
});
