import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './superadmin/dashboard/dashboard.component';
import { RegisteradminComponent } from './superadmin/registeradmin/registeradmin.component';
import { SidebarComponent } from './superadmin/sidebar/sidebar.component';
import { SuperadminprofileComponent } from './superadmin/superadminprofile/superadminprofile.component';
import { AdmindescriptionComponent } from './superadmin/admindescription/admindescription.component';
import { AllusersComponent } from './superadmin/allusers/allusers.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { RegistermemberComponent } from './admin/registermember/registermember.component';
import { AllmembersComponent } from './admin/allmembers/allmembers.component';
import { AdminprofileComponent } from './admin/adminprofile/adminprofile.component';
import {SuperadminservicesguardGuard} from './superadmin/superadminservices/superadminservicesguard.guard'
import {AdminservicesguardGuard} from './admin/adminservices/adminservicesguard.guard'
import { AdminsettingsComponent } from './admin/adminsettings/adminsettings.component';
import { VerifypasswordComponent } from './admin/verifypassword/verifypassword.component';
import { ChangepasswordComponent } from './admin/changepassword/changepassword.component';
import { HelpcomponentComponent } from './helpcomponent/helpcomponent.component';
import { ChatComponent } from './angularbot/chat/chat.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"signin",
    pathMatch:"full"
  },
  {
      path:"signin",
      component:SigninComponent
  },
  {
     path:"verifypassword/:id",
     canActivate:[AdminservicesguardGuard],
     component:VerifypasswordComponent
  },
  {
      path:"changepassword/:id",
      canActivate:[AdminservicesguardGuard],
      component:ChangepasswordComponent
  },
  {
    path:"superadmin",
    component:SidebarComponent,
    canActivate:[SuperadminservicesguardGuard],
    children:[
      {
      path:"dashboard",
      component:DashboardComponent 
      },
      {
       path:"registeradmin",
       component:RegisteradminComponent
      },
      {
        path:"superadmindescription",
        component:SuperadminprofileComponent
      },
      {
        path:"allusers",
        component:AllusersComponent
      },{
        path:"admindescription/:id",
        component:AdmindescriptionComponent
      },
      {
        path:"help",
        component:ChatComponent
     },
    ]
  },
  
  {
    path:"admin",
    component:AdminComponent,
    canActivate:[AdminservicesguardGuard],
    children:[
      {
      path:"admindashboard/:id",
      component:AdmindashboardComponent
      },
      {
      path:"registermember/:id",
      component:RegistermemberComponent
      },
      {
        path:"allmembers/:id",
        component:AllmembersComponent
      },{
        path:"adminprofile",
        component:AdminprofileComponent
      },{
        path:"adminsettings",
        component:AdminsettingsComponent
      },{
        path:"adminsettings/:id",
        component:AdminsettingsComponent
      },{
        path:"afteraction/:id",
        component:AdmindashboardComponent
      },{
          path:"help",
          component:ChatComponent
       
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
