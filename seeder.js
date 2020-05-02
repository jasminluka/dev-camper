const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('colors');

const Bootcamp = require('./models/Bootcamp');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

// Import data into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);

    console.log('Data Imported...'.green.inverse);

    process.exit(1);
  }
  catch (err) {
    console.log(err);
  }
}

// Delete data from DB
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();

    console.log('Data Destroyed...'.red.inverse);

    process.exit(1);
  }
  catch (err) {
    console.log(err);
  }
}

if (process.argv[2] === '-i') {
  importData();
}
else if (process.argv[2] === '-d') {
  deleteData();
}