import { Component, ViewChild } from '@angular/core';
import {SuperadminserviceService} from '../superadminservices/superadminservice.service'
import {OnInit} from '@angular/core'
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DeletemodelComponent} from "../deletemodel/deletemodel.component"
import { EditmodelComponent } from '../editmodel/editmodel.component';
import { Router } from '@angular/router';
import {ServicesService} from '../../services/services.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  admins:any=[]
  adminid:String=''

  constructor( private adminService:SuperadminserviceService,
               private service:ServicesService,
               public dialog:MatDialog,
               public router:Router){

  }
  //@ViewChild(EditmodelComponent)

  ngOnInit(){
    this.getAdminData()
    
   
  }
  // ngAfterViewInit(){
  //   console.log(this.adminid)
  // }

  handleAction(id:any,action:any){
    console.log(id)
    this.adminid=id
     if(action=="delete"){
         this.openDialog('0ms','0ms')
     }
     if(action=='edit'){
      this.openDialog2()
     }
     if(action=='admindescription'){
      this.router.navigate([`superadmin/admindescription/${id}`])
     }
  }
  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeletemodelComponent, {
      width: '250px',
      data:{id:this.adminid},
      enterAnimationDuration,
      exitAnimationDuration,
      
    });
  }
  openDialog2() {
    const dialogRef = this.dialog.open(EditmodelComponent,{
      data:{id:this.adminid}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getAdminData(){
    this.adminService.getAdmin().subscribe((response:any)=>{
      console.log(typeof response.admins)
      console.log(response)
      if(response.status){
        this.admins=response.admins
      }
    })
  }
  

}