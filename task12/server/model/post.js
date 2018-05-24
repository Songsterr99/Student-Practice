const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// установка схемы
const postSchema = new Schema({
  description: String,
  createdAt: {type:Date, default: Date.now()},
  author: String,
  photoLink: String,
  deleted: Boolean,
  hashTags: [String],
  likes: [String]
});


module.exports = mongoose.model("Post", postSchema);