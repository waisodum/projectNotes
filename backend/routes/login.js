var express = require("express");
var router = express.Router();
var createUser = require('../models/userSchema').User
const { compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
router.use(passport.initialize());
require('../models/passport');



router.post('/',(req,res) => {
    createUser.findOne({username: req.body.username}).then(user => {
      if (!user){
        return res.status(401).send({
          success: false,
          message: "could not find the user."
        })
      }
      if(!compareSync(req.body.password,user.password)){
        return res.status(401).send({
          success: false,
          message: "Incorrect password"
        })
      }
      const payload = {
        username: user.username,
        id: user._id
      }
      const token = jwt.sign(payload, "randomstring",{ expiresIn : "14d"})
  
      return res.status(200).cookie({
        success: true,
        message: "loggedin successfully",
        token: "Bearer " + token
      })
    })
  
  })


  router.get('/protected',passport.authenticate('jwt',{session: false}),(req,res) => {
    return res.status(200).send({
      success: true,
     user : {
      id: req.user._id,
      username: req.user.username
     }
    })
  })
  module.exports=router