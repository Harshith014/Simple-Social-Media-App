const mongoose = require('mongoose');

const db = async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/socialmedia', { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected successfully');
}

module.exports = db;