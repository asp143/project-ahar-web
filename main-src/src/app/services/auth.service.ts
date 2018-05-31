import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/bundles/Rx';
import { tokenNotExpired } from 'angular2-jwt';
@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3001/users/register', user, {headers: headers})
    .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3001/users/authenticate', user, {headers: headers})
    .map(res => res.json());
  }
  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3001/users/profile', {headers: headers})
    .map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  getLogs() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3001/api/logs', {headers: headers})
    .map(res => res.json());
  }
  getUsers() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3001/users/users', {headers: headers})
    .map(res => res.json());
  }

  deleteUser(id) {
    return this.http.delete('http://localhost:3001/users/users/'+id)
        .map(res => res.json());
  }

  updateStatus(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3001/users/users/'+user._id, JSON.stringify(user), {headers: headers})
      .map(res => res.json());
  }
  loadDataLogs() {
    const url = 'http://localhost:3001/api/logs';
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

}
