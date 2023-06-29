import { Component } from '@angular/core';
import {FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { AdminservicesService } from '../adminservices/adminservices.service';


@Component({
  selector: 'app-verifypassword',
  templateUrl: './verifypassword.component.html',
  styleUrls: ['./verifypassword.component.scss']
})
export class VerifypasswordComponent {
  verifyPassword!:FormGroup
  submitted:boolean=false
  verify:any={}
  _id:any;

  constructor(private router:Router,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    private adminService:AdminservicesService){

    }
    ngOnInit(){
      this.verifyPassword=this.formBuilder.group({
        password:new FormControl('',[Validators.required])
      })
      this._id=this.route.snapshot.paramMap.get('id')

 }
 verAdPassword(){
  console.log(this._id)
  this.submitted=true
if(this.verifyPassword.valid){
  console.log(this.verifyPassword.value)
  this.verify=this.verifyPassword.value
  this.adminService.verifyPassword(this._id,this.verify.password).subscribe((response:any)=>{
    console.log(response)
    if(response.message){
      this.router.navigate([`changepassword/${this._id}`])
    }
  })
}
 }

 get err(){
  //console.log(this.registrationForm)
   return this.verifyPassword.controls

}

}
