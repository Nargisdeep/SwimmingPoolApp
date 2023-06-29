import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms'
import {ServicesService} from '../services/services.service'
import {LocalStorageService} from '../localStorageService/local-storage.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  type:string="password"
  isText:boolean=false
  eyeIcon:string="fa-eye-slash"
  signInForm!:FormGroup
  submitted:boolean=false
  loggingIn:any
  isLoggedIn:boolean=false
  error:any

 constructor(private router:Router,
             private formBuilder:FormBuilder,
             private signInService:ServicesService,
             private localStorageSer:LocalStorageService,
             private toastr: ToastrService ){

 }
 ngOnInit(){
      this.signInForm=this.formBuilder.group({
        email:new FormControl('',[Validators.email,Validators.required]),
        password:new FormControl('',[Validators.required])
      }


      )

 }
 hideOrShowPass(){
    this.isText = !this.isText
    this.isText? this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash"
    this.isText? this.type = "text":this.type="password"
  }
  
  signIn(){
    console.log(this.signInForm.value)
    
    this.submitted=true
    if(this.signInForm.valid){
      this.loggingIn=this.signInForm.value
        this.signInService.signin(this.loggingIn.email,this.loggingIn.password).subscribe((response:any)=>{
          console.log(response)
          if(response){
            this.localStorageSer.Logger(response)
            if(response.role=="admin"){
              this.toastr.success(` Welcome ${response.role}`);
              this.router.navigate([`admin/admindashboard/${response._id}`])
            }
            else{
              this.toastr.success(` Welcome ${response.role}`);
              this.router.navigate(['superadmin/dashboard'])
            }
            
            
          }
        },
        (error:any)=>{
          this.error=error
          console.log(this.error)
          
        })
      }
  }
  
  get err(){
     return this.signInForm.controls

  }

}
