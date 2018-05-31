const express = require('express');
const router = express.Router();
const Doc = require('../models/writtenreport');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
/* GET users listing. */
router.get('/',function(req,res,next){
    res.send('DOCS');
});

router.post('/register',function(req,res,next){
    let newDoc = new Doc({
        code:req.body.code,
        username:req.body.username,
        accidentID:req.body.accidentID,
        patientInfo:{
        Name:req.body.patientInfo.Name,
        //age:this.age,
        address:req.body.patientInfo.address,
        birthday:req.body.patientInfo.birthday,
        complaint:req.body.patientInfo.complaint,
        vitalsign:{
          airway:{
             clear:req.body.patientInfo.vitalsign.airway.clear,
             obstructed:req.body.patientInfo.vitalsign.airway.obstructed
          },
          o2supply:{
            roomair:req.body.patientInfo.vitalsign.o2supply.roomair,
            oxygenG:req.body.patientInfo.vitalsign.o2supply.oxygenG
          },
          Breathing:{
            Bnormal:req.body.patientInfo.vitalsign.Breathing.Bnormal,
            shallow:req.body.patientInfo.vitalsign.Breathing.shallow,
            rapid:req.body.patientInfo.vitalsign.Breathing.rapid,
            labored:req.body.patientInfo.vitalsign.Breathing.labored,
            absent:req.body.patientInfo.vitalsign.Breathing.absent

          },
          Capref:{
            L_twosecs:req.body.patientInfo.vitalsign.Capref.L_twosecs,
            G_twosecs:req.body.patientInfo.vitalsign.Capref.G_twosecs,
            G_foursecs:req.body.patientInfo.vitalsign.Capref.G_foursecs,
            capAbsent:req.body.patientInfo.vitalsign.Capref.capAbsent
          },bloodsugar:req.body.patientInfo.vitalsign.bloodsugar
        }
        },
    managementnotes:req.body.managementnotes,
    date:req.body.date,
    nameofcaller:req.body.nameofcaller,
    teamresponder:req.body.teamresponder,
    emergencyroutetimerecord:{
        callrecieved:req.body.emergencyroutetimerecord.callrecieved,
        respondtime:req.body.emergencyroutetimerecord.respondtime,
        arrivaltoscene:req.body.emergencyroutetimerecord.arrivaltoscene,
        leftscene:req.body.emergencyroutetimerecord.leftscene,
        hospitalarrival:req.body.emergencyroutetimerecord.hospitalarrival,
        acdrrmoarrival:req.body.emergencyroutetimerecord.acdrrmoarrival
    },
    natureaccident:{
      vehicularacc:req.body.natureaccident.vehicularacc,
      pedacc:req.body.natureaccident.pedacc,
      selfacc:req.body.natureaccident.selfacc,
      medacc:req.body.natureaccident.medacc,
      maternalacc:req.body.natureaccident.maternalacc,
      otheracc:req.body.natureaccident.otheracc
    },
    vehicleinvolved:{
      bicycle:req.body.vehicleinvolved.bicycle,
      tricycle:req.body.vehicleinvolved.tricycle,
      motorcycle:req.body.vehicleinvolved.motorcycle,
      car:req.body.vehicleinvolved.car,
      suv:req.body.vehicleinvolved.suv,
      van:req.body.vehicleinvolved.van,
      bus:req.body.vehicleinvolved.bus,
      truck:req.body.vehicleinvolved.truck,
      puj:req.body.vehicleinvolved.puj,
      other:req.body.vehicleinvolved.other
    },
    patienttransport:{
      resuscitation:req.body.patienttransport.resuscitation,
      emergency:req.body.patienttransport.emergency,
      urgent:req.body.patienttransport.urgent,
      semiurgent:req.body.patienttransport.semiurgent,
      routine:req.body.patienttransport.routine,
    },
    incidentlocation:req.body.incidentlocation,
    motor:{
          obey:req.body.motor.obey,
          local:req.body.motor.local,
          withdraw:req.body.motor.withdraw,
          flex:req.body.motor.flex,
          extend:req.body.motor.extend,
          Mnone:req.body.motor.Mnone

    },eye:{
          spont:req.body.eye.spont,
          verbal:req.body.eye.verbal,
          pain:req.body.eye.pain,
          Enone:req.body.eye.Enone

    },verbal:{
          Vnone:req.body.verbal.Vnone,
          orient:req.body.verbal.orient,
          confuse:req.body.verbal.confuse,
          inaprop:req.body.verbal.inaprop,
          incomp:req.body.verbal.incomp
          
    },
    total:req.body.total,
    levelofconsiousness:{
          a:req.body.levelofconsiousness.a,
          v:req.body.levelofconsiousness.v,
          p:req.body.levelofconsiousness.p,
          u:req.body.levelofconsiousness.u
    },vitalsign:{
        vtime:req.body.vitalsign.vtime,//String
  vpulse:req.body.vitalsign.vpulse,//String
  vbp:req.body.vitalsign.vbp,//String
  vresp:req.body.vitalsign.vresp,//String
  vtemp:req.body.vitalsign.vtemp,//String
  vsao:req.body.vitalsign.vsao//String

    },skin:{
      normal:req.body.skin.normal,
  cyanotic:req.body.skin.cyanotic,
  redness:req.body.skin.redness,
  pale:req.body.skin.pale,
  //skin temp
  warm:req.body.skin.warm,
  hot:req.body.skin.hot,
  cool:req.body.skin.cool,
  cold:req.body.skin.cold
    }

});

Doc.addDocument(newDoc,function(err,callback){
        console.log(newDoc);
        if(err) res.json({success:false,msg:"ERROR SAVING DOC OCCURED"});
        else res.json({success:true,msg:"Saved"});
    });
});
router.post('/getbyaccidentID',function(req,res,next){
  var accidentID = req.body.accidentID;
  Doc.findbyaccidentID(accidentID,function(err,callback){
    if(err) throw err;
    if(callback) res.json(callback);
  });
});
router.get('/getdoc',passport.authenticate('jwt',{session:false}),function(req,res,next){
    var username = req.user.username;
    Doc.getByUsername(username,function(err,callback){
        if(err) throw err;
        if(callback) res.json(callback);
    });
});
module.exports = router;