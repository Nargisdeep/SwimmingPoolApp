import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminservicesService {
 log:any;
 enviroment:string=environment.url
  constructor(private http:HttpClient) { }

  isloggedIn(){
    this.log=localStorage.getItem('logger')
    return this.log
  }
  getAdminbyId(_id:string){
    console.log(_id)
    return this.http.get(`${this.enviroment}/users/admingetbyid/${_id}`)
  }
  putAdmin(_id:string,poolname:string,poollocation:string,adminname:string,adminusername:string,adminemail:string,adminmobile:number,adminpassword:string,poolhourlyrate:number,gender:string,active:boolean,adminaddress:string){
    console.log(_id)
    return this.http.put(`${this.enviroment}/users/adminput/${_id}`,{
      poolname,poollocation,adminname,adminusername,adminemail,adminmobile,adminpassword,poolhourlyrate,gender,active,adminaddress
    })
  }
  verifyPassword(_id:string,password:string){
    return this.http.post(`${this.enviroment}/users/verifypassword/${_id}`,{
      password
    })
  }
  changePassword(_id:string,newpassword:string){
    return this.http.patch(`${this.enviroment}/users/changepassword/${_id}`,{
      newpassword
    })
  }
  registerMember(admin_id:string,mainmember:string,member1:string,member2:string,member3:string,member4:string,member5:string,numofmales:number,numoffemales:number,mainmobile:number,memAddress:string,sickness:string,mainemail:string,starttime:string,endtime:string){
   console.log(mainmobile)
    return this.http.post(`${this.enviroment}/users/registermember`,{
      admin_id,mainmember,member1,member2,member3,member4,member5,numofmales,numoffemales,mainmobile,memAddress,sickness,mainemail,starttime,endtime
    })
  }
  getMember(admin_id:string){
    return this.http.get(`${this.enviroment}/users/getmember/${admin_id}`)
  }
  getMemberDashboard(admin_id:string){
    return this.http.get(`${this.enviroment}/users/getmemberdashboard/${admin_id}`)
  }
  memberDelete(id:string){
    console.log(id)
    return this.http.delete(`${this.enviroment}/users/deletemember/${id}`)
  }
  getMemberByID(id:string){
    return this.http.get(`${this.enviroment}/users/getmemberbyId/${id}`)
  }
  editMember(id:string,mainmember:string,member1:string,member2:string,member3:string,member4:string,member5:string,numofmales:number,numoffemales:number,mainmobile:number,memAddress:string,sickness:string,mainemail:string,starttime:string,endtime:string){
    return this.http.put(`${this.enviroment}/users/editmember/${id}`,{
      mainmember,member1,member2,member3,member4,member5,numofmales,numoffemales,mainmobile,memAddress,sickness,mainemail,starttime,endtime
    })
  }
  getToken(){
    const data=localStorage.getItem('logger')
    console.log(data)
    return JSON.parse(data)
  }
  patchEndTime(_id:string,endtime:string){
   return this.http.patch(`${this.enviroment}/users/patchendtime/${_id}`,{
    endtime
   }) 
  }
}
