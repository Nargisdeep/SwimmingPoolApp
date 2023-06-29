import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {SuperadminserviceService} from './superadminservice.service'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class SuperadminservicesguardGuard implements CanActivate {
  log:any
  logged:any={}
  constructor(private auth:SuperadminserviceService,private router:Router,private toastr: ToastrService){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.log=this.auth.isLoggedIn()
      this.logged=JSON.parse(this.log)
      if(!this.logged){
        this.toastr.error('Sign In First');
        this.router.navigate(['signin'])
        return false
      }
      else{
        if(this.logged.role!="superadmin"){
          this.toastr.error('Sign In First');
        this.router.navigate(['signin'])
        return false
        }
      }
    return true;
  }
  
}
