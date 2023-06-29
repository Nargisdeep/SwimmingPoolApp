import { Component,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminservicesService } from '../adminservices/adminservices.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DeletedminComponent } from '../deletedmin/deletedmin.component';
import {EditmemberComponent} from '../editmember/editmember.component';

import { TimecompletedComponent } from '../timecompleted/timecompleted.component';
import { ToastrService } from 'ngx-toastr';
import {Howl, Howler} from 'howler';


@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent {
  _id:string=''
  members:any={}
  startTime:number;
  endTime:number;
  poolname:string
  hourlyrate:number;
  timeSpent:Array<number>=[]
  amount:string;
  totalTime:string;
  timeEnd:Number;
  realDeal:any;
  id:string;
  hstarttime:Array<string>=[]
  hendtime:Array<string>=[]
  
  
  constructor(private route:ActivatedRoute,
    private adminService:AdminservicesService,
    public dialog:MatDialog,
    private toastr: ToastrService,
    private cdRef:ChangeDetectorRef){}
   
  ngOnInit(){
   
   
    this._id=this.route.snapshot.paramMap.get('id')
    this.getMembersDataDashboard()
    
    this.adminService.getAdminbyId(this._id).subscribe((response:any)=>{
      this.hourlyrate=response.admin.poolhourlyrate
      this.poolname=response.admin.poolname
      this.id=response.admin._id
    })
    this.cdRef.detectChanges()
    
    
    
  }
  getMembersDataDashboard(){
     this.adminService.getMemberDashboard(this._id).subscribe((response:any)=>{
      console.log(response)
      this.members=response.members
      this.cdRef.detectChanges()
     })
    
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,id:any): void {
    this.dialog.open(DeletedminComponent, {
      width: '250px',
      data:{_id:id,id:this._id},
      enterAnimationDuration,
      exitAnimationDuration,
  });
  }
  openDialog2(id:any) {
    console.log(id)
    this.dialog.open(EditmemberComponent,{
      data:{_id:id,id:this._id}
    })
  }
  openDialog3(_id:string,mainmember:string,starttime:string,endtime:string,numofmales:number,numoffemales:number,poolhourlyrate:number,mainemail:string,mainmobile:number,memAddress:string,poolname:string,id:string,){
    const dialogRef=this.dialog.open(TimecompletedComponent, {
      width: '400px',
      height:'250px',
      data:{_id:_id,mainmember:mainmember,starttime:starttime,endtime:endtime,numofmales:numofmales,numoffemales:numoffemales,poolhourlyrate:this.hourlyrate,mainemail:mainemail,mainmobile:mainmobile,memAddress:memAddress,poolname:this.poolname,id:this.id,}
    });
    dialogRef.updatePosition({
      right: '20px',  // Set left position
      top: '100px'    // Set top position
    });
   
  }
  playAlarm(){
    Object.values(this.members).map((ele:any)=>{
      console.log(ele)
       const endTimeS:Number=Number(ele.endtime.split(":")[0])*60*60 + Number(ele.endtime.split(":")[1])*60
       console.log(endTimeS)
       let DateNow:any=new Date()
    let TimeNow:Number=Number(DateNow.getHours() *60*60)+Number(DateNow.getMinutes()*60)+Number(DateNow.getSeconds())
    console.log(TimeNow)
    if(TimeNow>endTimeS){
      console.log("I am ")
      //this.toastr.error(`${ele.mainmember}'s time is Up!`)
      this.openDialog3(ele._id,ele.mainmember,ele.starttime,ele.endtime,ele.numofmales,ele.numoffemales,this.hourlyrate,ele.mainemail,ele.mainmobile,ele.memAddress,this.poolname,this.id)
      sound.play()
    }  
  })
    console.log("hello")
  }
  stopAlarm(){
    sound.stop()
    sound.unload()
  }
  onTimeChange(endtime:any) {
    var timeSplit = endtime.split(':'),
      hours,
      minutes,
      meridian;
   
      
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
    return hours + ':' + minutes + ' ' + meridian
   
  }


 
}
const sound = new Howl({
  src: ['../../../assets/Ting-sound-effect.mp3'],
  onend: function() {
      console.log('Finished!');
  },
  onloaderror: function() {
      console.log('Error!');
  },
})
 
 