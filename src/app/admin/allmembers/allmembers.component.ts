import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminservicesService } from '../adminservices/adminservices.service';

@Component({
  selector: 'app-allmembers',
  templateUrl: './allmembers.component.html',
  styleUrls: ['./allmembers.component.scss']
})
export class AllmembersComponent {

  _id:string=''
  members:string=''
  constructor(private route:ActivatedRoute,
    private adminService:AdminservicesService){

  }
  ngOnInit(){
    this._id=this.route.snapshot.paramMap.get('id')
    this.getMembersData()

  }
getMembersData(){
     this.adminService.getMember(this._id).subscribe((response:any)=>{
      console.log(response)
      this.members=response.members
     })
  }

}
