const mongoose = require('mongoose');
require('dotenv').config()
const mongoConnection = process.env.ATLAS_URI

const connectDB = async () => {
  try {
    await mongoose.connect(mongoConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;