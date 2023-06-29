import { Component,Inject} from '@angular/core';
import {FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms'
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdminservicesService } from '../adminservices/adminservices.service';
import { interval, Observable, of, Subject, merge, NEVER } from 'rxjs';
import { map, mapTo, scan, startWith, switchMap, tap } from 'rxjs/operators'
import { DeletedminComponent } from '../deletedmin/deletedmin.component';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import {Howl, Howler} from 'howler';
interface State {
  count?: boolean
  value?: number
}

@Component({
  selector: 'app-timecompleted',
  templateUrl: './timecompleted.component.html',
  styleUrls: ['./timecompleted.component.scss']
})
export class TimecompletedComponent {
  
 updateET:boolean=false
 updateEndT!:FormGroup
 submitted:boolean=false
 endTime:any
 elapsedTime = 0;
 amount:Number
 genInvoice:boolean=false
 docDefinition:any={}
 genHTMLInvoice:boolean=true

  pause$ = new Subject<void>();
  start$ = new Subject<void>();
  reset$ = new Subject<void>();
  constructor(private formBuilder:FormBuilder,
              private adminService:AdminservicesService,
              private DialogRef:MatDialogRef<TimecompletedComponent>,
              public dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {_id:string,mainmember:string,starttime:string,endtime:string,numofmales:number,numoffemales:number,poolhourlyrate:number,mainemail:string,mainmobile:number,memAddress:string,poolname:string,id:string}){
  
    }
  ngOnInit(){
    let startTimeS:Number=Number(this.data.starttime.split(":")[0])*60*60 + Number(this.data.starttime.split(":")[1])*60
    const endTimeS:Number=Number(this.data.endtime.split(":")[0])*60*60 + Number(this.data.endtime.split(":")[1])*60
    let DateNow:any=new Date()
    let TimeNow:Number=Number(DateNow.getHours() *60*60)+Number(DateNow.getMinutes()*60)+Number(DateNow.getSeconds())
    let RealTime:Number=Number(TimeNow)-Number(startTimeS)
    this.updateEndT=this.formBuilder.group({
      endtime:new FormControl('',[Validators.required])
    })
    const events$ = merge(
      this.start$.pipe(mapTo({ count: true})),
      this.pause$.pipe(mapTo({ count: false })),
      this.reset$.pipe(mapTo({ value: 0 }))
    );

    const stopWatch$ = events$.pipe(
      startWith(({ count:false, value:Number(RealTime) })),
      scan((state: State, curr): State => ({ ...state, ...curr })),
      tap((state: State) => this.setValue(state.value)),
      switchMap((state: State) =>
        state.count
          ? interval(1000).pipe(
              tap(_ => (state.value += 1)),
              tap(_ => this.setValue(state.value))
            )
          : NEVER
      )
    );

    stopWatch$.subscribe();
    this.onStartAction()
    let poolHours:Number=Number(this.elapsedTime/(60 * 60))
    if(TimeNow>endTimeS){
     console.log(endTimeS)
     this.onPauseAction()
     sound.play()
     this.genInvoice=true
    }
    this.amount=Math.floor(Number(poolHours) * Number(this.data.poolhourlyrate))
    
  }
  updateEndTime(){
    this.onStartAction()
    if(this.updateET){
      this.updateET=false
    }
    else{
      this.updateET=true
    }
   
  }
   updateEndTimeReal(){
    this.submitted=true
    if(this.updateEndT.valid){
     this.endTime=this.updateEndT.value
     console.log(this.endTime)
     this.adminService.patchEndTime(this.data._id,this.endTime.endtime).subscribe((response:any)=>{
       console.log(response)
     })
     
    }

  }
  get err(){
    
     return this.updateEndT.controls

  }
  private setValue(val: number) {
    this.elapsedTime = val;
  }

  onStartAction() {
    console.log('start');

    this.start$.next();
  }

  onPauseAction() {
    console.log('pause');
    this.genInvoice=true
    this.pause$.next();
  }

  onResetAction() {
    console.log('reset');
    this.reset$.next();
  }
  generatePDF(action:any = 'open') {
    console.log("heelo")
    this.docDefinition = {
      content: [
        {
          text: 'GO SWIM',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'BILL',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: 'Swimmer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.data.mainmember,
                bold:true
              },
              { text: this.data.mainemail },
              { text: this.data.mainmobile },
              { text: this.data.memAddress }
            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              { 
                text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Billing Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto','auto'],
            body: [
              ['Pool Name', 'Hourly Rate', 'Start Time','End Time','Amount'],
              [`${this.data.poolname}`,`Rs.${this.data.poolhourlyrate}`,`${this.data.starttime}`,`${this.data.endtime}`,`Rs.${this.amount}`],
              [{text: 'Total Amount', colSpan: 4}, {}, {},{}, `Rs.${this.amount}`]
            ]
          }
        },
        {
          text: 'Additional Details',
          style: 'sectionHeader'
        },
      {
        columns: [
          [{ qr: `${this.data.mainmember}`, fit: '50' }],
          [{ text: 'Signature', alignment: 'right', italics: true}],
        ]
      },
      {
        text: 'VISIT AGAIN',
        style: 'sectionHeader'
      }
      ],styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        }
      }
    }
    return new Promise((resolve,reject)=>{
      pdfMake.createPdf(this.docDefinition).open()
    })
  } 
  handlePdfGen(){
      this.generatePDF().then(()=>{
       console.log("done")
      }).then(()=>{
        console.log("PDFgenerated")
      }).catch((err)=>
      {
        console.log("err")
      })
  }
  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,id:any): void {
    this.dialog.open(DeletedminComponent, {
      width: '250px',
      data:{_id:id,id:this.data.id},
      enterAnimationDuration,
      exitAnimationDuration,
  });
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
