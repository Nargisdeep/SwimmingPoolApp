import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  response:any
  enviroment:string=environment.url

  constructor(private http:HttpClient) { }
  signin(email:string,password:string){
    console.log(email)
    console.log(password)
    console.log("helllooooo")
    return this.http.post(`${this.enviroment}/users/signin`,{
       email,password
    })
  }
  getSuperAdmin(){
    return this.http.get(`${this.enviroment}/users/getsuperadmin`)
  }

}
