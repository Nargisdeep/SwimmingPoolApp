import { Component } from '@angular/core';
import {SuperadminserviceService} from '../superadminservices/superadminservice.service'
import {FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms'
import {OnInit} from '@angular/core'
import { Router } from '@angular/router';


@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.scss']
})
export class AllusersComponent {
  admins:any=[]
  actions!:FormGroup
  postrealActions:any={}


  constructor(private formBuilder:FormBuilder,
     private adminService:SuperadminserviceService,
    public router:Router){

}
ngOnInit(){
  this.actions=this.formBuilder.group({
    canEdit:new FormControl(''),
    beActive:new FormControl('',[Validators.requiredTrue])
  })
  this.getAllAdminData()
 
}
getAllAdminData(){
  this.adminService.getAllAdmin().subscribe((response:any)=>{
    console.log(response)
    this.admins=response.admins
    this.patchActions(response.admins)
  })
}
postActions(id:any){
  console.log(this.actions.value)
  this.postrealActions=this.actions.value
  alert(JSON.stringify(this.actions.value,null,2))
  console.log(id)
  this.adminService.changeAdmin(id,this.postrealActions.beActive,this.postrealActions.canEdit).subscribe((response:any)=>{
    console.log(response)
  })
}
patchActions(data:any){
  return this.actions.patchValue({canEdit:data.pertoedithourlyrate,beActive:data.active})
}

}
