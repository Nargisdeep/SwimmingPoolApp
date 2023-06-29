import { Component ,OnInit} from '@angular/core';
import {FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms'
import {SuperadminserviceService} from '../superadminservices/superadminservice.service'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registeradmin',
  templateUrl: './registeradmin.component.html',
  styleUrls: ['./registeradmin.component.scss']
})
export class RegisteradminComponent {
  genders:string[]=["Male","Female"]
  active:string[]=["Yes","No"]
  registrationForm!:FormGroup
  submitted:boolean=false
  admin:any={}
  admins:any={}
  adimage:string=""
  emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  error:any
  constructor(private formBuilder:FormBuilder,
              private adminService:SuperadminserviceService,
              private router:Router,
              private toastr:ToastrService ){

  }
  ngOnInit(){
    this.registrationForm=this.formBuilder.group({
      poolname:new FormControl('',[Validators.required]),
      poollocation:new FormControl('',[Validators.required]),
      adminname:new FormControl('',[Validators.required]),
      adminusername:new FormControl('',[Validators.required]),
      adminemail:new FormControl('',[Validators.pattern(this.emailRegex),Validators.required]),
      adminmobile:new FormControl('',[Validators.required,Validators.minLength(10)]),
      adminpassword:new FormControl('',[Validators.required]),
      poolhourlyrate:new FormControl('',[Validators.required]),
      gender:new FormControl('',[Validators.required]),
      active:new FormControl('',[Validators.required]),
      adminaddress:new FormControl('',[Validators.required]),
      adminimage:new FormControl('',[Validators.required])
    })
      this.adminService.getAdmin().subscribe((response:any)=>{
        console.log(response)
        this.admins=response
      })
  }

  postAdmin(){
    this.submitted=true
    if(this.registrationForm.valid){
       this.admin=this.registrationForm.value
       this.adimage="../../../assets/"+this.admin.adminimage.split("\\")[2]
       this.adminService.postAdmin(this.admin.poolname,this.admin.poollocation,this.admin.adminname,this.admin.adminusername,this.admin.adminemail,this.admin.adminmobile,this.admin.adminpassword,this.admin.poolhourlyrate,this.admin.gender,this.admin.active,this.admin.adminaddress,this.adimage).subscribe((response:any)=>{
        console.log(response)
        if(response.status){
          this.toastr.success('Admin is Added successfully');

          this.router.navigate([`superadmin/dashboard`])
        }
       },
       (error:any)=>{
        this.toastr.error(`${error}`);
             this.error=error
       })
       console.log(this.admin)
    }


  }
  get err(){
    //console.log(this.registrationForm)
     return this.registrationForm.controls

  }
}
