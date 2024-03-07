require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define the Post schema
const postSchema = new Schema({
  title: { type: String, required: true },
  Branch: { type: String, required: true },
  Year: { type: String, required: true },
  Path: { type: String, required: true },
  Subject: { type: String, required: true },
userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true ,unique:false},
});

// Define the User schema
const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  Branch: { type: String, required: true },
  Year: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], // Reference to Post documents
});

// Create the User model
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);
module.exports = { User, Post };
