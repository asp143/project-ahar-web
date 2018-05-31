const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('../config/database');
const Log = require('../models/log');
const passport = require('passport');
const jwt = require('jsonwebtoken');




router.get('/logs', (req, res, next) => {
  Log.find( function(err, logs){
    if(err) {
      res.send('Error has occured');
    }
    else {
      res.json(logs); 
    }
  });
});

router.get('/getByName',passport.authenticate('jwt',{session:false}), function(req, res, next) {
 // res.json({user:req.user});
  var username = req.user.accidentID;
  Log.getByaccidentID(username,function(err,callback){
    if(err) throw err;
    if(callback)
    res.json(callback);
    //console.log(callback[0].date.month);
    if(!callback)
    res.json({success:false,msg:"No such File"});
  });
});

router.get('/logs/:id', (req, res, next) => {
  Log.findById(req.params.log_id, function(err, log){
    if(err) {
      res.send('Error has occured');
    }
    else {
      res.json(log);
    }
  });
});

router.get('/logs/vtype/:vehicletype', (req, res, next) => {
  var vtype = req.param(vehicletype);
  Log.findOne(vtype, function(err, log){
    if(err) {
      res.send('Error has occured');
    }
    else {
      res.json(log);
    }
  });
});

  //mapping
  router.get('/getByLocation',passport.authenticate('jwt',{session:false}), function(req, res, next) {
    // res.json({user:req.user});
   var username = req.user.username;
       Log.getAllLocations(username,function(err,callback){
           if(err) throw err;
           if(!callback) res.json({success:false,msg:'No such file'});
           if(callback) res.json(callback);
   
       });  
   });
module.exports = router;