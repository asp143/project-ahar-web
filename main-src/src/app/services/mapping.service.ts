import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import *  as _ from 'underscore';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class MappingService {
  authToken:any;
  constructor(private http:Http) { }
  loadToken(){
    
            var token = localStorage.getItem('id_token');
            this.authToken = token;
            //this.user = user;
        }
  getlocation(){
    //gets all the data that matches the users zipcode
        var headers = new Headers();
        this.loadToken();//access token
        headers.append('Authorization',this.authToken);
        headers.append('Content-type','application/json');
        return this.http.get('http://localhost:3001/logs/getByLocation', {headers:headers})
        .toPromise().then((res) => res.json());
    }
}
