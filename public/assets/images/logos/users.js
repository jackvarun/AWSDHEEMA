var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database')
var User = require('../models/user');

//register
router.post('./register', (req, res, next) => {
  let newUser =new User({
    name:req.body.name,
    email: req.body.email,
    phonenumber:req.body.phonenumber,
    username: req.body.username,
    password:req.body.password,
    confirmpassword: req.body.confirmpassword,
  });

  user.addUser(newUser, (err, user) =>{
    if(err){
      res.json({sucess: false, msg:'Failed to register user'});
    } else{
      res.json({sucess: true, msg:'user registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) =>{
  var username = req.body.username;
  var password = req.body.password;

  user.getuserByUsername(username, (err, user) =>{
    if (err)throw err;
    if(!user){
      return res.json({sucess: false, msg: 'user not found'});
    }
    user.comparepasword(password, user.password, (err, isMatch) =>{
      if (err) throw err;
      if(ismatch){
        const token =jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          sucess:true,
          token:'JWT '+token,
          user:{
            id: user._id,
            name: user.name,
            email: user.email,
            phonenumber: user.phonenumber,
            username: user.username,
            confirmusername: user.confirmusername
          }
        });
      } else {
        return res.json({sucess: false, msg: 'wrong passwword'});
      }
    });
  });
});

//profile
// Authenticate
router.post('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json ({user: req.user});
});



// respond
router.get('/', function (req, res, next) {
  res.send('respond with a test resource');
});
// define create route
router.get('/create', function (req, res, next) {
  var vm = {
    title: 'create an account'
  };
  res.render('users/create', vm);
});
// define the home page route
router.post('/create', function (req, res, next) {
  userService.addUser(req.body, function(err) {
    if (err){
  var vm = {
    title: 'create an account',
    input: req.body,
    error:'err'
  };
  delete vm.input.password;
  return res.render('users/create', vm);
}
res.redirect('/dashboard');
});
});

module.exports = router;
