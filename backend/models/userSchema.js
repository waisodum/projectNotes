require('dotenv').config()
const mongoose=require('mongoose');
async function connecting() {
    await mongoose
    .connect(
      "mongodb://emikealson139:Sal2212@ac-bvyyg4v-shard-00-00.1ripenz.mongodb.net:27017,ac-bvyyg4v-shard-00-01.1ripenz.mongodb.net:27017,ac-bvyyg4v-shard-00-02.1ripenz.mongodb.net:27017/?ssl=true&replicaSet=atlas-12s8c1-shard-0&authSource=admin&retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("connected to db");
    }).catch((err)=>{
console.log(err);
    })
}
connecting();


const Schema = mongoose.Schema;

// Define the Post schema
const postSchema = new Schema({
  title: { type: String, required: true },
  Branch: { type: String, required: true },
  Year: { type: String, required: true },
Subject: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

// Define the User schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  Branch: { type: String, required: true },
  Year: { type: String, required: true },
  Subject: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] // Reference to Post documents
});

// Create the User model
const User = mongoose.model('User', userSchema);
const Post=mongoose.model('Post',postSchema);
module.exports = {User,Post};
