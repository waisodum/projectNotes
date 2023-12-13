var express = require('express');
var router = express.Router();
var createUser = require('../models/userSchema').User
/* GET home page. */
router.post('/', function(req, res, next) {
  data=req.body
  console.log(data);
  res.send('good')
});
router.post('/i',(req,res,next)=>{
  console.log(req.body)
createUser.find()})

module.exports = router;
