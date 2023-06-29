import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError ,catchError} from 'rxjs';
import{AdminservicesService} from '../adminservices/adminservices.service'
import { Router } from '@angular/router';

@Injectable()
export class AdminInterceptorInterceptor implements HttpInterceptor {

  constructor(private adminService:AdminservicesService,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(!localStorage.getItem("logger")){

      return next.handle(request)
    }
    else{
      const data=JSON.parse(localStorage.getItem("logger"))
       const token=data.token
       const role=data.role
         if(token){
    return next.handle(request.clone({ setHeaders: { authorization: `Bearer ${token}`,role:`${role}` } }))
    }
  }
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status==422){
            console.log("Unauthorized Access")
            this.router.navigate(['signin'])
          }
        }
        return throwError(()=>new Error("Error Occured"))
      })
    )
  }
}
