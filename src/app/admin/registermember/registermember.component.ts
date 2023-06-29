import { Component } from '@angular/core';
import {FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms'
import {AdminservicesService} from '../adminservices/adminservices.service'
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registermember',
  templateUrl: './registermember.component.html',
  styleUrls: ['./registermember.component.scss']
})
export class RegistermemberComponent {

  registrationMember!:FormGroup
  submitted:boolean=false
  admin:any={}
  admins:any={}
  adimage:string=""
  _id:string=''
  emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  constructor(private formBuilder:FormBuilder,
              private router:Router,
              private adminServices:AdminservicesService ,
              private route:ActivatedRoute,
              private toastr: ToastrService){

  }
  ngOnInit(){
    this.registrationMember=this.formBuilder.group({
      mainmember:new FormControl('',[Validators.required]),
      numofmales:new FormControl('',[Validators.required]),
      member1:new FormControl(''),
      numoffemales:new FormControl('',[Validators.required]),
      member2:new FormControl(''),
      mainmobile:new FormControl('',[Validators.required,Validators.minLength(10)]),
      member3:new FormControl(''),
      memAddress:new FormControl('',[Validators.required]),
      member4:new FormControl(''),
      sickness:new FormControl(''),
      member5:new FormControl(''),
      email:new FormControl('',[Validators.required,Validators.pattern(this.emailRegex)]),
      starttime:new FormControl('',[Validators.required]),
      endtime:new FormControl('')
    })
    this._id=this.route.snapshot.paramMap.get('id')

  }
  onTimeChange() {
    if(this.registrationMember.value.starttime){
    var timeSplit = this.registrationMember.value.starttime.split(':'),
    hours,
      minutes,
      meridian;
    }
    if(this.registrationMember.value.endtime){
      var timeSplit = this.registrationMember.value.endtime.split(':'),
      hours,
      minutes,
      meridian;
    }
      
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }
    
    alert(hours + ':' + minutes + ' ' + meridian);
  }

  postMember(){
    this.submitted=true
    if(this.registrationMember.valid){
       this.admin=this.registrationMember.value
       console.log(typeof this.admin.starttime)
        this.adminServices.registerMember(this._id,this.admin.mainmember,this.admin.member1,this.admin.member2,
                                          this.admin.member3,this.admin.member4,this.admin.member5,this.admin.numofmales,
                                          this.admin.numoffemales,this.admin.mainmobile,this.admin.memAddress,
                                          this.admin.sickness,this.admin.email,this.admin.starttime,this.admin.endtime).subscribe((response:any)=>{
                                            console.log(response)
                                            if(response.status){
                                              this.toastr.success('Member added Successfully');
                                              this.router.navigate([`admin/allmembers/${this._id}`])
                                            }
                                          }
                                          )
       console.log(this.admin)
    }


  }
  get err(){
    //console.log(this.registrationForm)
     return this.registrationMember.controls

  }
}
