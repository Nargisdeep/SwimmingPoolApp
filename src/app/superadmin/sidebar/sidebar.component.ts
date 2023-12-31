import { Component, ViewChild,AfterViewInit,OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent{

  @ViewChild(MatSidenav)
  sidenav!:MatSidenav;

  constructor(private observer:BreakpointObserver,
              private router:Router){

  }
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])

      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
}
handlelogout(){
  localStorage.removeItem('logger')
  this.router.navigate(['signin'])
}
 
}
