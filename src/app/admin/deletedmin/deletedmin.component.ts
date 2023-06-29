import { Component,Inject } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminservicesService } from '../adminservices/adminservices.service';


@Component({
  selector: 'app-deletedmin',
  template:'passed in {{data.id}}',
  templateUrl: './deletedmin.component.html',
  styleUrls: ['./deletedmin.component.scss']
})
export class DeletedminComponent {

  constructor(private DialogRef:MatDialogRef<DeletedminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {_id:string,id:string},
    private router:Router,
    private adminService:AdminservicesService){
  
    }
    ngOnInit(){
      console.log(this.data._id)
     }
     deleteThisMember(){
      console.log("To be deleted id",this.data._id)
      this.adminService.memberDelete(this.data._id).subscribe((response:any)=>{
        console.log(response)
        if(response.status){
         this.adminService.getMemberDashboard(this.data.id).subscribe((response:any)=>{
          console.log(response)
         })
         }
      })
      
     }
  
  }
  
