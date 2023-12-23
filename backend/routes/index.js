var express = require("express");
var router = express.Router();
var createUser = require("../models/userSchema").User;
const { hashSync, compareSync } = require("bcrypt");


router.post("/Register", async (req, res) => {
  var userName = req.body.username;
  var found;
  var email;
  // console.log(req.body);
  await createUser.findOne({ username: userName }).then((user) => {
    // console.log(user);
    found = user;
  });
  await createUser.findOne({ email: req.body.email }).then((user) => {
    // console.log(user);
    email = user;
  });

  if (found) {
    return res.send({success:false,message:"Username Exists"});
  }
  if (email) {
    return res.send({success:false,message:"email already exists"});
  }

  var data = {
    firstname:req.body.firstname,
    lastname:req.body.lasname,
    username: req.body.username,
    password: await hashSync(req.body.password, 10),
    Branch: req.body.branch,
    Year: req.body.year,
    email: req.body.email,
    posts: [],
  };
  const user = new createUser(data);
  await user.save()
    .then((user) => {
      res.send({
        success: true,
        message: "User created successfully",
        user: {
          id: user._id,
          username: user.username,
        },
      });

    })
    .catch((err) => {
      
      res.send({
        success: false,
        message: "Something went wrong",
        error: err,
        errr:true
      });
    });
});

router.delete("/delete", async (req, res, next) => {
  await createUser.deleteMany({}).then(() => {
    res.send("ok will do");
  });
  let data = await createUser.find({});
  console.log(data);
});

module.exports = router;
