import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './superadmin/navbar/navbar.component';
import { SidebarComponent } from './superadmin/sidebar/sidebar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import { RegisteradminComponent } from './superadmin/registeradmin/registeradmin.component'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './superadmin/dashboard/dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { DeletemodelComponent } from './superadmin/deletemodel/deletemodel.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EditmodelComponent } from './superadmin/editmodel/editmodel.component';
import { AdmindescriptionComponent } from './superadmin/admindescription/admindescription.component';
import { AllusersComponent } from './superadmin/allusers/allusers.component';
import { SigninComponent } from './signin/signin.component';
import { SuperadminprofileComponent } from './superadmin/superadminprofile/superadminprofile.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { RegistermemberComponent } from './admin/registermember/registermember.component';
import { AllmembersComponent } from './admin/allmembers/allmembers.component';
import { AdminprofileComponent } from './admin/adminprofile/adminprofile.component';
import { AdminsettingsComponent } from './admin/adminsettings/adminsettings.component';
import { AdmindialogComponent } from './admin/admindialog/admindialog.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { VerifypasswordComponent } from './admin/verifypassword/verifypassword.component';
import { ChangepasswordComponent } from './admin/changepassword/changepassword.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { DeletedminComponent } from './admin/deletedmin/deletedmin.component';
import { EditmemberComponent } from './admin/editmember/editmember.component';
import { TimecompletedComponent } from './admin/timecompleted/timecompleted.component';
import { AdminInterceptorInterceptor} from './admin/admin-interceptor/admin-interceptor.interceptor'
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import {ErrorinterceptorInterceptor} from './errorinterceptor/errorinterceptor.interceptor'
import {MatTooltipModule} from '@angular/material/tooltip';
import { MinuteSecondsPipe } from './admin/pipe/minute-seconds.pipe';
import {NgxPrintModule} from 'ngx-print';
import { HelpcomponentComponent } from './helpcomponent/helpcomponent.component';
import { AngularbotModule } from './angularbot/angularbot.module';
import { ServiceWorkerModule } from '@angular/service-worker';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    NavbarComponent,
    SidebarComponent,
    RegisteradminComponent,
    DashboardComponent,
    DeletemodelComponent,
    EditmodelComponent,
    AdmindescriptionComponent,
    AllusersComponent,
    SigninComponent,
    SuperadminprofileComponent,
    AdmindashboardComponent,
    RegistermemberComponent,
    AllmembersComponent,
    AdminprofileComponent,
    AdminsettingsComponent,
    AdmindialogComponent,
    VerifypasswordComponent,
    ChangepasswordComponent,
    DeletedminComponent,
    EditmemberComponent,
    TimecompletedComponent,
    MinuteSecondsPipe,
    HelpcomponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatSlideToggleModule,
    NgxMaterialTimepickerModule,
    MatTooltipModule,
    NgxPrintModule,
    AngularbotModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
    
  ],
  providers: [
    {
     provide:HTTP_INTERCEPTORS,
     useClass:AdminInterceptorInterceptor,
     multi:true
    },{
      provide:HTTP_INTERCEPTORS,
      useClass:ErrorinterceptorInterceptor,
      multi:true
     },
    provideAnimations(),
    provideToastr({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
