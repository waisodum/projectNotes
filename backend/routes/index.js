var express = require("express");
var router = express.Router();
var createUser = require("../models/userSchema").User;
const { hashSync } = require("bcrypt");


router.post("/Register", async (req, res) => {
  //var hashedPassword =
  var userName = req.body.username;
  var found;
  //req.body.username
  await  createUser.findOne({ username: userName }).then((user) => {
     console.log(user);
    found = user;
  });

  if (found) {

return res.send({USER:false});
  }

  var data = {
    username: req.body.username,
    password: await hashSync(req.body.password, 10),
    Branch: req.body.branch,
    Year: req.body.year,
    email: req.body.email,
    posts: [],
  };
  const user = new createUser(data);
  await user
    .save()
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
      });
    });

  // res.send('hello from register')
});
router.delete("/delete", async (req, res, next) => {
  await createUser.deleteMany({}).then(() => {
    res.send("ok will do");
  });
  let data = await createUser.find({});
  console.log(data);
});

module.exports = router;
