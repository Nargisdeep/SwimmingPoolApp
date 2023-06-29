import { Component ,Inject} from '@angular/core';
import {FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms'
import {SuperadminserviceService} from '../superadminservices/superadminservice.service'
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-editmodel',
  template:'passed in {{data.id}}',
  templateUrl: './editmodel.component.html',
  styleUrls: ['./editmodel.component.scss']
})
export class EditmodelComponent {

  registrationForm!:FormGroup
  submitted:boolean=false
  admin:any={}
  adimage:string=""
  constructor(private DialogRef:MatDialogRef<EditmodelComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {id:string},
              private formBuilder:FormBuilder,
              private adminService:SuperadminserviceService){

  }
  ngOnInit(){
    console.log(this.data.id)
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
      adminaddress:new FormControl('',[Validators.required])
    })
    if(this.data.id){
      this.adminService.getAdminbyId(this.data.id).subscribe((response:any)=>{
        console.log(response)
        if(response.status){
          this.adimage=response.admin.adminimage
          this.patchUpdateData(response.admin)
        }
      }
      )
    }
   }
   patchUpdateData(data:any){
    console.log(data.active)
    return this.registrationForm.patchValue({poolname:data.poolname,poollocation:data.poollocation,
                                             adminname:data.adminname,adminusername:data.adminusername,
                                             adminemail:data.adminemail,adminmobile:data.adminmobile,
                                            adminpassword:data.adminpassword,poolhourlyrate:data.poolhourlyrate,
                                            gender:data.gender,active:data.active,adminaddress:data.adminaddress
                                          })
  }
   
   postOnUpdate(){
    console.log("hello")
    this.submitted=true
  
    if(this.registrationForm.valid){
      this.admin=this.registrationForm.value
      this.adminService.putAdmin(this.data.id,this.admin.poolname,this.admin.poollocation,
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
     return this.registrationForm.controls

  }
}
