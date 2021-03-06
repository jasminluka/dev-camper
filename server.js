const path = require('path');
const express = require('express');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
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

// If i can guess somebodies password this will log that user in. The first user it finds on DB
// "email": {"$gt":""}, password": "123456"
// Sanitize data / prevent NoSQL injection
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,   // 10 mins
  max: 100
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/auth', require('./routes/api/v1/auth'));
app.use('/api/v1/bootcamps', require('./routes/api/v1/bootcamps'));
app.use('/api/v1/courses', require('./routes/api/v1/courses'));
app.use('/api/v1/reviews', require('./routes/api/v1/reviews'));
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