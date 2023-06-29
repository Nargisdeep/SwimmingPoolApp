import { Component } from '@angular/core';
import {FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms'
import {ServicesService} from '../../services/services.service'

@Component({
  selector: 'app-superadminprofile',
  templateUrl: './superadminprofile.component.html',
  styleUrls: ['./superadminprofile.component.scss']
})
export class SuperadminprofileComponent {
  sadimage:string=''
  superadmin!:FormGroup
  constructor(private formBuilder:FormBuilder,
              private getadmin:ServicesService){

  }
  ngOnInit(){
    this.superadmin=this.formBuilder.group({
      name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      address:new FormControl('',[Validators.required]),
      mobile:new FormControl('',[Validators.required])
    })

    this.getadmin.getSuperAdmin().subscribe((response:any)=>{
      console.log(response)
      if(response.status){
        this.sadimage=response.superadmin.image
        this.patchSuperData(response.superadmin)
      }
    })
    
  }
  patchSuperData(data:any){
    console.log(data)
    return this.superadmin.patchValue({name:data.name,email:data.email,address:data.address,mobile:data.mobile})
   }

  }



