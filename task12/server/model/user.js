const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// установка схемы
const userSchema = new Schema({
  login: String,
  password: String
});

module.exports = mongoose.model("User", userSchema);