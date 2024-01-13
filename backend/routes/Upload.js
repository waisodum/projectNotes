var express = require("express");
var router = express.Router();
var User = require("../models/userSchema").User;
var Post = require("../models/userSchema").Post;

router.post('/',async(req,res)=>{


  
  console.log(req.body);
  res.send('thabjsgfd')





})



module.exports = router;
