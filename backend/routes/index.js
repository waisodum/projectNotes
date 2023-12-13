var express = require('express');
var router = express.Router();
const userModel = require('../models/userSchema');
const { hashSync } = require('bcrypt');



/* GET home page. */
router.post('/', function(req, res, next) {
  data=req.body
  console.log('hello');
  res.send('good')
});
router.get('/',(req,res,next)=>{
  res.send('hi')
})
router.post('/Register',(req,res)=>{
  const user = new userModel({
    username : req.body.username,
    password : hashSync(req.body.password,10)
  })
  user.save().then(user=>{
    res.send({
      success: true,
      message: "User created successfully",
      user: {
        id : user._id,
        username : user.username
      }
    })
  }).catch(err=>{
    res.send({
      success: false,
      message: "Something went wrong",
     error: err
    })

  })
})

module.exports = router;
