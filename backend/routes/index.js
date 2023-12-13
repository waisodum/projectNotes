var express = require('express');
var router = express.Router();
var createUser = require('../models/userSchema').User
const { hashSync } = require('bcrypt');



/* GET home page. */
router.post('/', function(req, res, next) {
  data=req.body
  console.log(data);
  res.send('good')
});
router.post('/i',(req,res,next)=>{
  console.log(req.body)
createUser.find()})
router.get('/',(req,res,next)=>{
  res.send('hi')
})
router.post('/Register',async(req,res)=>{
  //var hashedPassword =
   const user = new createUser({
     username : req.body.username,
   password :   await hashSync(req.body.password,10),
   Branch:'fe',
   Year: 'jgfd',
   Subject: 'kjhgv',
   email: 'kjbh',
   posts: [],

})
console.log(user);
await  user.save().then(user=>{
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
  let data = await createUser.find({});
console.log(data);
  // res.send('hello from register')
})
router.delete('/delete',async(req,res,next)=>{
await createUser.deleteMany({}).then(()=>{
  res.send('ok will do')
});
let data = await createUser.find({});
console.log(data);
})

module.exports = router;
