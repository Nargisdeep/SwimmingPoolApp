import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


   Logger(value:any){
    console.log("hello")
    localStorage.setItem("logger",JSON.stringify(value))
   }
  
}
