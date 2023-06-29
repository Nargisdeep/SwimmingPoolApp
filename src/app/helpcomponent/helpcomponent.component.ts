import { Component } from '@angular/core';

@Component({
  selector: 'app-helpcomponent',
  templateUrl: './helpcomponent.component.html',
  styleUrls: ['./helpcomponent.component.scss']
})
export class HelpcomponentComponent {

  logger:any
  log:any
  role:any

  ngOnInit(){
  
   this.logger=localStorage.getItem('logger')
   this.log=JSON.parse(this.logger)
   console.log(this.logger)  
   console.log(this.log) 
   
   if (this.log.role=="superadmin"){
    this.role="Superadmin"
   }
   else{
    this.role="Admin"
   }

  }

}
