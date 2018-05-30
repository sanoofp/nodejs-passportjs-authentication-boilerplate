const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: String,
  githubID: String,
  date: { type: Date, default: Date.now }
});

const User = mongoose.model('Users-demo', userSchema);

module.exports = User;