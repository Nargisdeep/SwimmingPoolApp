import { Component,Inject } from '@angular/core';
import {FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms'
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdminservicesService } from '../adminservices/adminservices.service';
import { RouterTestingHarness } from '@angular/router/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editmember',
  template:'passed in {{data.id}}',
  templateUrl: './editmember.component.html',
  styleUrls: ['./editmember.component.scss']
})
export class EditmemberComponent {

  editMember!:FormGroup
  submitted:boolean=false
  admin:any={}
  members:any={}
  _id:string=''

  constructor(private DialogRef:MatDialogRef<EditmemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {_id:string,id:string},
    private formBuilder:FormBuilder,
    private adminService:AdminservicesService,
    private router:Router){

}

ngOnInit(){
  this.editMember=this.formBuilder.group({
    mainmember:new FormControl('',[Validators.required]),
    numofmales:new FormControl('',[Validators.required]),
    member1:new FormControl(''),
    numoffemales:new FormControl('',[Validators.required]),
    member2:new FormControl(''),
    mainmobile:new FormControl('',[Validators.required]),
    member3:new FormControl(''),
    memAddress:new FormControl('',[Validators.required]),
    member4:new FormControl(''),
    sickness:new FormControl(''),
    member5:new FormControl(''),
    email:new FormControl('',[Validators.required]),
    starttime:new FormControl('',[Validators.required]),
    endtime:new FormControl('')
  })
  if(this.data._id){
    console.log(this.data._id)
    this.adminService.getMemberByID(this.data._id).subscribe((response:any)=>{
      console.log(response)
      if(response.status){
        this.patchUpdateData(response.member)
      }
    }
    )
  }

}
patchUpdateData(data:any){
  return this.editMember.patchValue({mainmember:data.mainmember,member1:data.member1,member2:data.member2,
                                     member3:data.member3,member4:data.member4,member5:data.member5,numofmales:data.numofmales,
                                     numoffemales:data.numoffemales,mainmobile:data.mainmobile,memAddress:data.memAddress,
                                     sickness:data.sickness,email:data.mainemail,starttime:data.starttime,endtime:data.endtime
                                        })
}
postOnUpdate(){
  console.log("hello")
  this.submitted=true

  if(this.editMember.valid){
    this.admin=this.editMember.value
    this.adminService.editMember(this.data._id,this.admin.mainmember,this.admin.member1,this.admin.member2,
      this.admin.member3,this.admin.member4,this.admin.member5,this.admin.numofmales,
      this.admin.numoffemales,this.admin.mainmobile,this.admin.memAddress,
      this.admin.sickness,this.admin.email,this.admin.starttime,this.admin.endtime).subscribe((response:any)=>{
                                console.log(response)
                                
                               })
  }
  
 }
 get err(){
  //console.log(this.registrationForm)
   return this.editMember.controls

}
}
