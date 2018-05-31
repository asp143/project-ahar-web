import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from './User';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  users: User[];

  ngOnInit() {
    this.authService.getUsers().subscribe(users => {
      this.users = users;
    },
  err => {
    console.log(err);
    return false; 
  });
  }

  deleteUser(id) {
    const users = this.users;

    this.authService.deleteUser(id).subscribe(data => {
      if(data.n == 1 ) {
        for(var i = 0; i < users.length; i++ ){
          if(users[i]._id == id ) {
            users.splice(i, 1);
          }
        }
      }
    })

  }

  updateStatus(user) {
    const _user = {
      _id: user._id,
      isAdmin: !user.isAdmin
    };

    this.authService.updateStatus(_user).subscribe(data => {
      user.isAdmin = !user.isAdmin;
    });
  }

}
