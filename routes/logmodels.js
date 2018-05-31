var express = require('express');
var router = express.Router();
var Log = require('../models/logmodel');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
/* GET users listing. */
router.get('/',function(req,res,next){
    res.send('LOGS');
});
router.post('/getone',function(req,res,next){

    var platenumber = req.body.platenumber;
    
    Log.getUserByName(platenumber,function(err,platenumber){
        if(err) throw err;
        if(!platenumber) return res.json({success:false,msg:"ERROR: NO SUCH NAME"});
        if(platenumber) return res.json(platenumber);
    });
        
});
router.get('/getall',function(req,res,next){

    Log.getAll(function(err,doc){
        if(err) throw err;
        if(!doc)
            return res.json({success:false,msg:"ERROR: NO SUCH NAME"});
        if(doc)
            return res.json(doc);
        
    });
    
});
router.get('/getByName',passport.authenticate('jwt',{session:false}), function(req, res, next) {
 // res.json({user:req.user});
var username = req.user.username;
  Log.getByUsername(username,function(err,callback){
    if(err) throw err;
    if(callback)
    res.json(callback);
    //console.log(callback[0].date.month);
    if(!callback)
    res.json({success:false,msg:"No such File"});
  });
});
router.get('/getByMonth',passport.authenticate('jwt',{session:false}), function(req, res, next) {
 // res.json({user:req.user});
var username = req.user.username;
    Log.getAllMonths(username,function(err,callback){
        if(err) throw err;
        if(!callback) res.json({success:false,msg:'No such file'});
        if(callback) res.json(callback);

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