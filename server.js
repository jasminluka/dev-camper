const path = require('path');
const express = require('express');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
require('colors');

const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error');

// load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();

app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/auth', require('./routes/api/v1/auth'));
app.use('/api/v1/bootcamps', require('./routes/api/v1/bootcamps'));
app.use('/api/v1/courses', require('./routes/api/v1/courses'));
app.use('/api/v1/users', require('./routes/api/v1/users'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);

  // Close server & exit process
  server.close(() => process.exit(1));
});