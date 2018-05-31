import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ValidateService } from './services/validate.service';
import { ReportdataService} from './services/reportdata.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';
import 'hammerjs';
import { PostformComponent } from './postform/postform.component';
import { MdDatepickerModule, MdNativeDateModule } from '@angular/material';
import { AuthGuard } from './guards/auth.guard';
import { LogsComponent } from './logs/logs.component';
import { ChartreportComponent } from './chartreport/chartreport.component';
import {CovalentLayoutModule} from '@covalent/core';
import {CovalentMediaModule} from '@covalent/core';
import {CovalentHttpModule} from '@covalent/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SearchFilterPipe } from './logs/searchfilterpipe';
import { MapComponent } from './map/map.component';
import { MappingService } from './services/mapping.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { ReportlogsComponent } from './reportlogs/reportlogs.component';
import { SearchfilterPipe } from './reportlogs/searchfilter.pipe';
import { PostformdowloadComponent } from './postformdowload/postformdowload.component';
import { DataTablesModule } from 'angular-datatables';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'postform', component: PostformComponent, canActivate: [AuthGuard] },
  { path: 'postformdownload', component: PostformdowloadComponent, canActivate: [AuthGuard] },
  { path: 'reportlogs', component: ReportlogsComponent, canActivate: [AuthGuard] },
  { path: 'chartreport', component: ChartreportComponent, canActivate: [AuthGuard] },
  { path: '', component: LogsComponent, canActivate: [AuthGuard] },
  { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
  { path: 'users', component: AdminpanelComponent, canActivate: [AuthGuard] },


]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PostformComponent,
    LogsComponent,
    ChartreportComponent,
    SearchFilterPipe,
    MapComponent,
    AdminpanelComponent,
    ReportlogsComponent,
    SearchfilterPipe,
    PostformdowloadComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    BrowserAnimationsModule,
    FlashMessagesModule,
    MdDatepickerModule,
    MdNativeDateModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentHttpModule.forRoot(),
    NgxChartsModule,
    Ng2SmartTableModule,
    DataTablesModule
  ],
  providers: [ValidateService, AuthService, AuthGuard, MappingService,ReportdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
