import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import  {JwtHelperService} from '@auth0/angular-Jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LoginUrl: string ="https://localhost:44343/api/User/";
  private AddUserUrl: string ="https://localhost:44343/api/";
  private userPayLoad :any ;

  constructor(private http : HttpClient , private router : Router) {
    this.userPayLoad= this.decodeToken();
   }



  login(loginObj : any){
    return this.http.post<any>(`${this.LoginUrl}authentication` , loginObj);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['Login']);

  }
  AddTeacher(teacherObj: any){
    return this.http.post<any>(`${this.AddUserUrl}Admin` , teacherObj);
  }

  AddStudent(studentObj: any){
    return this.http.post<any>(`${this.AddUserUrl}Admin/student` , studentObj);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token' , tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }


  decodeToken(){
    const jwtHelper =new  JwtHelperService();
    const token= this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getUserNameFromToken(){
    if(this.userPayLoad)
    return this.userPayLoad.unique_name;
  }

  getRoleFromToken(){
    if(this.userPayLoad)
    return this.userPayLoad.role;
  }
}

