import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SuperadminserviceService {

  response:any
  log:any
  log2:any
  token:any
  enviroment:string=environment.url
  constructor(private http:HttpClient) { }

  getAdmin(){
    return this.http.get(`${this.enviroment}/users/adminget`)
  }
  postAdmin(poolname:string,poollocation:string,adminname:string,adminusername:string,adminemail:string,adminmobile:number,adminpassword:string,poolhourlyrate:number,gender:string,active:boolean,adminaddress:string,adminimage:string){
    return this.http.post(`${this.enviroment}/users/adminpost`,{
      poolname,poollocation,adminname,adminusername,adminemail,adminmobile,adminpassword,poolhourlyrate,gender,active,adminaddress,adminimage
    })
  }
  getAdminbyId(_id:string){
    console.log(_id)
    return this.http.get(`${this.enviroment}/users/admingetbyid/${_id}`)
  }
  deleteAdmin(_id:string){
    console.log(_id)
    return this.http.delete(`${this.enviroment}/users/admindelete/${_id}`)
  }
  putAdmin(_id:string,poolname:string,poollocation:string,adminname:string,adminusername:string,adminemail:string,adminmobile:number,adminpassword:string,poolhourlyrate:number,gender:string,active:boolean,adminaddress:string){
    console.log(_id)
    return this.http.put(`${this.enviroment}/users/adminput/${_id}`,{
      poolname,poollocation,adminname,adminusername,adminemail,adminmobile,adminpassword,poolhourlyrate,gender,active,adminaddress
    })
  }
  getAllAdmin(){
    return this.http.get(`${this.enviroment}/users/admingetall`)
  }
  isLoggedIn(){
    this.log=localStorage.getItem('logger')
    
    return this.log
  }
  changeAdmin(_id:string,active:boolean,pertoedithourlyrate:boolean){

    return this.http.put(`${this.enviroment}/users/changeadmin/${_id}`,{
      active,pertoedithourlyrate
    })
  }

}


