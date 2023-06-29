import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class ErrorinterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(1),catchError((error:HttpErrorResponse)=>{
        let errorMessage='';
        console.log(error.error.message)
        if(error.error instanceof HttpErrorResponse ){
          console.log("helllo interceptor")
          errorMessage=`Error:${error.error.message}`
        }else{
          
          errorMessage=`${error.error.message}`;
        }
        return throwError(()=>new Error(errorMessage))
      })

    )
  }
}
