import { Component, OnInit } from '@angular/core';
import {single, multi, tcyclemulti, mcyclemulti, carmulti} from './data';
import { TdDigitsPipe } from '@covalent/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-chartreport',
  templateUrl: './chartreport.component.html',
  styleUrls: ['./chartreport.component.css']
})
export class ChartreportComponent  {
  single: any[];
  multi: any[];
  view: any[] = [1800, 500];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  xAxisLabel1 = 'Car Type';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  
  onSelect(event) {
    console.log(event);
  }
  dataSource: Object;
  title = "Monthly Statistics";
  constructor(private authService: AuthService, private router: Router, private flashMessages: FlashMessagesService) {
    Object.assign(this, {single, multi, tcyclemulti, mcyclemulti, carmulti})   
    
  }
    
  ngOnInit() {
  }
  onLogoutClick() {
    this.authService.logout();
    this.flashMessages.show('You are logged out', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/login'])
  }

  getData() {

  }

}

