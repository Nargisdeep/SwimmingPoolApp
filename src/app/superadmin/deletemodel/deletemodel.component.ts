import { Component, Input,Inject} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SuperadminserviceService} from '../superadminservices/superadminservice.service'
import { ActivatedRoute, Router } from '@angular/router';
import {OnInit} from '@angular/core'

@Component({
  selector: 'app-deletemodel',
  template:'passed in {{data.id}}',
  templateUrl: './deletemodel.component.html',
  styleUrls: ['./deletemodel.component.scss']
})
export class DeletemodelComponent {

constructor(private DialogRef:MatDialogRef<DeletemodelComponent>,
  @Inject(MAT_DIALOG_DATA) public data: {id:string},
  private adminService:SuperadminserviceService,
  private router:Router){

  }
  ngOnInit(){
    console.log(this.data.id)
   }
   deleteThisAdmin(id:any){
    console.log("To be deleted id",id)
    this.adminService.deleteAdmin(id).subscribe((response:any)=>{
      console.log(response)
    })
    this.router.navigate(['afterdelete'])
   }

}
