import { Component } from '@angular/core';
import {FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {AdminservicesService} from '../adminservices/adminservices.service'

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.scss']
})
export class AdminprofileComponent {
 loggedadmin:any;
 admin:any;
 adminProfile!:FormGroup
 adimage:string=""
 adname:string=""
 _id:any={}
 isShown:boolean=false
 public hourlyrate:number=0
 constructor(private formBuilder:FormBuilder,
  private router:Router,
  private route:ActivatedRoute,
  private adminService:AdminservicesService){

  }

  ngOnInit(){
     this.loggedadmin=localStorage.getItem('logger')
     this.admin=JSON.parse(this.loggedadmin)
     console.log(this.admin._id)
     this._id=this.admin._id

     this.adminProfile=this.formBuilder.group({
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
      adminaddress:new FormControl('',[Validators.required]),
      isDeleted:new FormControl('',[Validators.required])
    })
    if(this._id){
      this.adminService.getAdminbyId(this._id).subscribe((response:any)=>{
        console.log(response)
        if(response.status){
          this.adimage=response.admin.adminimage
          this.adname=response.admin.adminname
          this.hourlyrate=response.admin.poolhourlyrate
          this.patchData(response.admin)
        }
      })
    }
  }
  patchData(data:any){
    console.log(data)
    return this.adminProfile.patchValue({poolname:data.poolname,poollocation:data.poollocation,
                                             adminname:data.adminname,adminusername:data.adminusername,
                                             adminemail:data.adminemail,adminmobile:data.adminmobile,
                                            adminpassword:data.adminpassword,poolhourlyrate:data.poolhourlyrate,
                                            gender:data.gender,active:data.active,adminaddress:data.adminaddress,
                                            isDeleted:data.isDeleted
                                          })
  }

}
