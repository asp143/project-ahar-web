const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const mongoose = require('mongoose');

//Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    province: req.body.province,
    city: req.body.city,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    zipcode: req.body.zipcode,
    contact: req.body.contact
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Failed to register user'
      });
    } else {
      res.json({
        success: true,
        msg: 'User registered'
      });
    }
  });
});

router.get('/users', (req, res, next) => {
  User.find(function (err, users) {
    if (err) {
      res.send('Error has occured');
    }
    else {
      res.json(users);
    }
  });
});
router.get('/users/:id', (req, res, next) => {
  User.findById({ _id: req.params.id }, function (err, user) {
    if (err) {
      res.send('Error has occured');
    }
    else {
      res.json(user);
    }
  });
});

router.delete('/users/:id', function (req, res, next) {
  User.remove({ _id: req.params.id }, function (err, user) {
    if (err) {
      res.send('Error has occured');
    }
    res.json(user);
  });
});

router.put('/users/:id', function(req, res, next){
  var user = req.body;
  var updUser = {};
  
  if(user.isDone){
      updUser.isDone = user.isDone;
  }
  
  if(!updUser){
      res.status(400);
      res.json({
          "error":"Bad Data"
      });
  } else {
    User.update({ _id: req.params.id} ,updUser, {}, function(err, user){
      if(err){
          res.send(err);
      }
      res.json(user);
  });
  }
});

//AUTHENTICATE
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        msg: 'User not found'
      })
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800
        });
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            contact: user.contact,
            province: user.province,
            city: user.city,
            zipcode: user.zipcode,
            username: user.username

          }
        });
      } else {
        return res.json({
          success: false,
          msg: 'Incorrect Password'
        })
      }
    });
  });
});

//PROFILE
router.get('/profile', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  res.json({
    user: req.user
  });
});

module.exports = router;