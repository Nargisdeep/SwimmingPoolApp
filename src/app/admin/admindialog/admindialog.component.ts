import { Component ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindialog',
  templateUrl: './admindialog.component.html',
  styleUrls: ['./admindialog.component.scss']
})
export class AdmindialogComponent {
  constructor(private router:Router,
    private DialogRef:MatDialogRef<AdmindialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id:string,name:string,image:string,username:string,hourlyrate:string}){

    }


    handleSettings(id:any){
      console.log(id)
      this.router.navigate([`admin/adminsettings/${id}`])
    }
    verifyPassword(id:any){
      console.log(id)
      this.router.navigate([`verifypassword/${id}`])
    }

}
