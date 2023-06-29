import { Component } from '@angular/core';
import {FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { AdminservicesService } from '../adminservices/adminservices.service';
import { ConfirmPasswordValidator } from '../validator/confirm-password.validator';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent {
  changePassword!:FormGroup
  submitted:boolean=false
  verify:any={}
  _id:any;


  constructor(private router:Router,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    private adminService:AdminservicesService){

    }
    ngOnInit(){
      this.changePassword=this.formBuilder.group({
        newpassword:new FormControl('',[Validators.required]),
        confirmpassword:new FormControl('',[Validators.required])
      },
      {
        validator: ConfirmPasswordValidator("newpassword", "confirmpassword")
      })
      this._id=this.route.snapshot.paramMap.get('id')

 }

 resetPassword(){
  this.submitted=true
  console.log(this._id)
  console.log(this.changePassword.value)
  if(this.changePassword.valid){
     this.adminService.changePassword(this._id,this.changePassword.value.newpassword).subscribe((response:any)=>{
      console.log(response)
      if(response.status){
        this.router.navigate(['signin'])
        localStorage.removeItem('logger')
      }
     })
  }
 }
 get err(){
  console.log(this.changePassword.controls)
   return this.changePassword.controls

}

}
