const mongoose = require("mongoose");

const SchemaPost = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  postName: {
    type: String,
    require: true,
  },

  postDetails: {
    type: String,
    require: true,
  },

  postImage: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("post", SchemaPost);
