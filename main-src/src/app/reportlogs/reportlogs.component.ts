import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ReportdataService } from '../services/reportdata.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ServerDataSource } from 'ng2-smart-table';


@Component({
  selector: 'app-reportlogs',
  templateUrl: './reportlogs.component.html',
  styleUrls: ['./reportlogs.component.scss']
})



export class ReportlogsComponent implements OnInit{
  logs: Object;

  source: ServerDataSource;
  constructor(private authService: AuthService, private router: Router, private flashMessages: FlashMessagesService,
    private reportdata:ReportdataService) {
  }
  accidentID:number=this.reportdata.info['accidentID'];
  data:object={
    accidentID:this.accidentID
  }
  ngOnInit() {
    this.reportdata.getreports(this.data).subscribe(logs => {
      this.logs = logs;
      console.log(JSON.stringify(this.logs[0]) + "reportlogs");

    },
  err => {
    console.log(err);
    return false;
  });
    if(typeof this.logs == 'undefined') this.flashMessages.show('No reports', {cssClass: 'alert-danger', timeout: 3000});
  }
  onLogoutClick() {
    this.authService.logout();
    this.flashMessages.show('You are logged out', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/login'])
  }
  onclick(number){

    this.reportdata.setInfo(this.logs[number]);
  }
  onView(number){
    this.reportdata.setDetails(this.logs[number]);
  }
}
