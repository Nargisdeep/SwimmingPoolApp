import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {AdminservicesService} from '../adminservices/adminservices.service'
import {FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-adminsettings',
  templateUrl: './adminsettings.component.html',
  styleUrls: ['./adminsettings.component.scss']
})
export class AdminsettingsComponent {
  _id:any=''
  adminSettings!:FormGroup
  submitted:boolean=false
  admin:any={}
  pertoedithourlyratebool:any;
  constructor(private router:Router,
              private route:ActivatedRoute,
              private formBuilder:FormBuilder,
              private adminService:AdminservicesService){

              }

  ngOnInit(){
    this.adminSettings=this.formBuilder.group({
      poolname:new FormControl('',[Validators.required]),
      poollocation:new FormControl('',[Validators.required]),
      adminname:new FormControl('',[Validators.required]),
      adminusername:new FormControl('',[Validators.required]),
      adminemail:new FormControl('',[Validators.email,Validators.required]),
      adminmobile:new FormControl('',[Validators.required]),
      adminpassword:new FormControl('',[Validators.required]),
      poolhourlyrate:new FormControl('',[Validators.required]),
      gender:new FormControl('',[Validators.required]),
      active:new FormControl('',[Validators.required]),
      adminaddress:new FormControl('',[Validators.required])
    })
    this._id=this.route.snapshot.paramMap.get('id')
    console.log(this._id)
    this.adminService.getAdminbyId(this._id).subscribe((response:any)=>{
      console.log(response)
      this.admin=response.admin
      this.patchUpdateData(response.admin)
      
    this.updatePermission(this.admin.pertoedithourlyrate)
    })
   
  }
  patchUpdateData(data:any){
    console.log(data.active)
    return this.adminSettings.patchValue({poolname:data.poolname,poollocation:data.poollocation,
                                             adminname:data.adminname,adminusername:data.adminusername,
                                             adminemail:data.adminemail,adminmobile:data.adminmobile,
                                            adminpassword:data.adminpassword,poolhourlyrate:data.poolhourlyrate,
                                            gender:data.gender,active:data.active,adminaddress:data.adminaddress
                                          })
  }
   
   postOnUpdate(){
    console.log("hello")
    this.submitted=true
  
    if(this.adminSettings.valid){
      this.admin=this.adminSettings.value
      this.adminService.putAdmin(this._id,this.admin.poolname,this.admin.poollocation,
                                 this.admin.adminname,this.admin.adminusername,this.admin.adminemail,
                                 this.admin.adminmobile,this.admin.adminpassword,this.admin.poolhourlyrate,
                                 this.admin.gender,this.admin.active,
                                 this.admin.adminaddress).subscribe((response:any)=>{
                                  console.log(response)
                                 })
    }
    
   }
   get err(){
    //console.log(this.registrationForm)
     return this.adminSettings.controls

  }
  
  updatePermission(pertoedithourlyrate:any){
    console.log(pertoedithourlyrate)
    if(pertoedithourlyrate){
      console.log("f",this.admin.pertoedithourlyrate)
      this.pertoedithourlyratebool=false
    }
    else{
      console.log("fl",this.admin.pertoedithourlyrate)
      this.pertoedithourlyratebool=true
    }
    console.log(this.pertoedithourlyratebool)
  }

}
