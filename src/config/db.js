const mongoose = require('mongoose');

// Connect to MongoDB
const database = module.exports = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database.');
  } catch (error) {
    console.log('Could not connect to database.');
    console.log(error);
  }
}
