import { Component,ViewChild,Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AdmindialogComponent } from '../admindialog/admindialog.component';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  adimage:string=""
  adname:string=""
  ad:any;
  admin:any
  _id:any


  @ViewChild(MatSidenav)
  sidenav!:MatSidenav;

  constructor(private observer:BreakpointObserver,
               public dialog:MatDialog,
              private router:Router,){

  }
  ngOnInit(){
   this.admin=localStorage.getItem('logger')
   console.log(this.admin)
   this.ad=JSON.parse(this.admin)
   this.adimage=this.ad.image
   this.adname=this.ad.name
   this._id=this.ad._id

  }
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])

      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
   
}
memDashboard(){
this.router.navigate([`admin/admindashboard/${this._id}`])
}
handlelogout(){
  localStorage.removeItem('logger')
  this.router.navigate(['signin'])
}
handleSettings(){
  console.log("hello")
  this.router.navigate(['admin/adminsettings'])
}
regMem(){
  this.router.navigate([`admin/registermember/${this._id}`])
}
allMembers(){
  this.router.navigate([`admin/allmembers/${this._id}`])
}
openDialog() {
  const dialogRef = this.dialog.open(AdmindialogComponent,{
    data:{id:this._id,
          name:this.adname,
          image:this.adimage,
          username:this.ad.username,
          hourlyrate:this.ad.hourlyrate}
  });
  dialogRef.updatePosition({
    right: '20px',  // Set left position
    top: '50px'    // Set top position
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
}
