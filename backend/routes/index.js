var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  data=req.body
  console.log('hello');
  res.send('good')
});
router.get('/',(req,res,next)=>{
  res.send('hi')
})

module.exports = router;
