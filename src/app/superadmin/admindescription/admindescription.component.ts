import { Component,OnInit} from '@angular/core';
import {FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms'
import {SuperadminserviceService} from '../superadminservices/superadminservice.service'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindescription',
  templateUrl: './admindescription.component.html',
  styleUrls: ['./admindescription.component.scss']
})
export class AdmindescriptionComponent {
  genders:string[]=["Male","Female"]
  active:string[]=["Yes","No"]
  registrationForm!:FormGroup
  submitted:boolean=false
  admin:any={}
  adimage:string=""
  _id:any={}
  constructor(private formBuilder:FormBuilder,
    private adminService:SuperadminserviceService,
    private router:Router,
    private route:ActivatedRoute){

    }

  ngOnInit(){
    this.registrationForm=this.formBuilder.group({
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
    this._id=this.route.snapshot.paramMap.get('id')
    console.log(this._id)
    if(this._id){
      this.adminService.getAdminbyId(this._id).subscribe((response:any)=>{
        console.log(response)
        if(response.status){
          this.adimage=response.admin.adminimage
          this.patchData(response.admin)
        }
      }
      )
    }
  }

  patchData(data:any){
    console.log(data)
    return this.registrationForm.patchValue({poolname:data.poolname,poollocation:data.poollocation,
                                             adminname:data.adminname,adminusername:data.adminusername,
                                             adminemail:data.adminemail,adminmobile:data.adminmobile,
                                            adminpassword:data.adminpassword,poolhourlyrate:data.poolhourlyrate,
                                            gender:data.gender,active:data.active,adminaddress:data.adminaddress,
                                            isDeleted:data.isDeleted
                                          })
  }

}
