import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { TeacherModel } from '../components/view-all-teachers/models/teacherModel';
import { StudentModel } from '../components/view-all-teachers/models/studentModel';
import { inject } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private TeacherUrl : string ="https://localhost:44343/api/Admin/";
  private StudentUrl: string="https://localhost:44343/api/Admin/";
  private updateTeacher : string="";
  


  constructor(private http : HttpClient , private router : Router ) { }

 public  ViewAllTeachers( ) {
    return this.http.get<any>(`${this.TeacherUrl}teachers`);
  }


  public ViewAllStudents( ){
    return this.http.get<any>(`${this.StudentUrl}Students`)
  }

  putTeacher( teacherObj: any , teacherId:number ){

    return this.http.put<any>(`${this.TeacherUrl}teacher/`+teacherId , teacherObj);

  } 

  

 deleteTeacher(email : string){
  return this.http.delete<any>(`${this.TeacherUrl}`+email);
 }


  getStudent(id: number){
    return this.http.get<any>(`${this.StudentUrl}Students`+id)
  }

  getcurrentTeacher(teacherId:number){
    return this.http.get<any>(`${this.TeacherUrl}teacher/`+teacherId )
  }

  
}
