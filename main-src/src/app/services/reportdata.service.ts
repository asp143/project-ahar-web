import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import *  as _ from 'underscore';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class ReportdataService {
  authToken: any;
  user: any;
  data:any;
  info:Object;
  location:Object;
  date:object;
  month:Number;
  details:Object;
  constructor(private http:Http) { }

    setDetails(info){
      this.details = {
        code:info.code,
        username:info.username,
        accidentID:info.accidentID,

        Name:info.patientInfo.Name,
        //age:this.age,
        address:info.patientInfo.address,
        birthday:info.patientInfo.birthday,
        complaint:info.patientInfo.complaint,

        clear:info.patientInfo.vitalsign.airway.clear,
        obstructed:info.patientInfo.vitalsign.airway.obstructed,

         roomair:info.patientInfo.vitalsign.o2supply.roomair,
         oxygenG:info.patientInfo.vitalsign.o2supply.oxygenG,

         Bnormal:info.patientInfo.vitalsign.Breathing.Bnormal,
         shallow:info.patientInfo.vitalsign.Breathing.shallow,
         rapid:info.patientInfo.vitalsign.Breathing.rapid,
         labored:info.patientInfo.vitalsign.Breathing.labored,
         absent:info.patientInfo.vitalsign.Breathing.absent,


                      L_twosecs:info.patientInfo.vitalsign.Capref.L_twosecs,
            G_twosecs:info.patientInfo.vitalsign.Capref.G_twosecs,
            G_foursecs:info.patientInfo.vitalsign.Capref.G_foursecs,
            capAbsent:info.patientInfo.vitalsign.Capref.capAbsent,
          bloodsugar:info.patientInfo.vitalsign.bloodsugar,


    managementnotes:info.managementnotes,
    date:info.date,
    nameofcaller:info.nameofcaller,
    teamresponder:info.teamresponder,

        callrecieved:info.emergencyroutetimerecord.callrecieved,
        respondtime:info.emergencyroutetimerecord.respondtime,
        arrivaltoscene:info.emergencyroutetimerecord.arrivaltoscene,
        leftscene:info.emergencyroutetimerecord.leftscene,
        hospitalarrival:info.emergencyroutetimerecord.hospitalarrival,
        acdrrmoarrival:info.emergencyroutetimerecord.acdrrmoarrival,

         vehicularacc:info.natureaccident.vehicularacc,
      pedacc:info.natureaccident.pedacc,
      selfacc:info.natureaccident.selfacc,
      medacc:info.natureaccident.medacc,
      maternalacc:info.natureaccident.maternalacc,
      otheracc:info.natureaccident.otheracc,

         bicycle:info.vehicleinvolved.bicycle,
      tricycle:info.vehicleinvolved.tricycle,
      motorcycle:info.vehicleinvolved.motorcycle,
      car:info.vehicleinvolved.car,
      suv:info.vehicleinvolved.suv,
      van:info.vehicleinvolved.van,
      bus:info.vehicleinvolved.bus,
      truck:info.vehicleinvolved.truck,
      puj:info.vehicleinvolved.puj,
      other:info.vehicleinvolved.other,

          resuscitation:info.patienttransport.resuscitation,
          emergency:info.patienttransport.emergency,
          urgent:info.patienttransport.urgent,
          semiurgent:info.patienttransport.semiurgent,
          routine:info.patienttransport.routine,

          incidentlocation:info.incidentlocation,
          obey:info.motor.obey,
          local:info.motor.local,
          withdraw:info.motor.withdraw,
          flex:info.motor.flex,
          extend:info.motor.extend,
          Mnone:info.motor.Mnone,
          spont:info.eye.spont,
          verbal:info.eye.verbal,
          pain:info.eye.pain,
          Enone:info.eye.Enone,
          orient:info.verbal.orient,
          confuse:info.verbal.confuse,
          inaprop:info.verbal.inaprop,
          incomp:info.verbal.incomp,
          Vnone:info.verbal.Vnone,
          total:info.total,
          a:info.levelofconsiousness.a,
          v:info.levelofconsiousness.v,
          p:info.levelofconsiousness.p,
          u:info.levelofconsiousness.u,
          vtime:info.vitalsign.vtime,//String
  vpulse:info.vitalsign.vpulse,//String
  vbp:info.vitalsign.vbp,//String
  vresp:info.vitalsign.vresp,//String
  vtemp:info.vitalsign.vtemp,//String
  vsao:info.vitalsign.vsao,//String

      normal:info.skin.normal,
  cyanotic:info.skin.cyanotic,
  redness:info.skin.redness,
  pale:info.skin.pale,
  //skin temp
  warm:info.skin.warm,
  hot:info.skin.hot,
  cool:info.skin.cool,
  cold:info.skin.cold

      }
      console.log(this.details);

    }
    setInfo(info){
      this.info=info;
      this.location=this.info['location'];
      this.date=this.info['date'];

      switch(this.date['month']) {
           case 'January': {
                  this.month=1;
              break;
         }
           case 'February': {
                  this.month=2;
              break;
         }
          case 'March': {
                  this.month=3;
              break;
         }
          case 'April': {
                  this.month=4;
              break;
         }
          case 'May': {
                  this.month=5;
              break;
         }
          case 'June': {
                  this.month=6;
              break;
         }
          case 'July': {
                  this.month=7;
              break;
         }
          case 'August': {
                  this.month=8;
              break;
         }
          case 'September': {
                  this.month=9;
              break;
         }
          case 'October': {
                  this.month=10;
              break;
         }
          case 'November': {
                  this.month=11;
              break;
         }
        case 'December': {
                  this.month=12;
              break;
         }
            }
    }
    getreports(data) {
      //console.log(JSON.stringify(data) + "getreports");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3001/report/getbyaccidentID',data,{headers: headers})
    .map(res => res.json());
    }
    registerDoc(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3001/report/register', data, {headers: headers})
    .map(res => res.json());
    }


}
