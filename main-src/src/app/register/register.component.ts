import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],

})
export class RegisterComponent implements OnInit {
  
  name: String;
  province: String;
  city: String;
  email: String;
  username: String;
  password: String;
  zipcode: String;
  contact: Number;

 
  

  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,      
      contact: this.contact,      
      province: this.province,
      city: this.city,
      zipcode: this.zipcode,      
      username: this.username,
      password: this.password,
    }

    if(!this.validateService.validateRegister(user)){ // Validate User Fields
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    if(!this.validateService.validateEmail(user.email)){ // Validate Email Field
     this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Successfully Registered', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['login'])
      }
      else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['register'])
      }
    });
  }

}
