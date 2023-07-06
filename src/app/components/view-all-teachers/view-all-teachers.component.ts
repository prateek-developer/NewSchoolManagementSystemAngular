
import { ApiService } from 'src/app/services/api.service';
import {Component, ViewChild} from '@angular/core';
import { TeacherModel } from './models/teacherModel';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AddTeacherComponent } from '../add-teacher/add-teacher.component';
import { Route, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-view-all-teachers',
  templateUrl: './view-all-teachers.component.html',
  styleUrls: ['./view-all-teachers.component.css']
})
export class ViewAllTeachersComponent {

  displayedColumns: string[] = ['teacherId', 'email', 'name', 'dob' , 'salary' , 'subjectTaught','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  type: string ="password";
  isText: boolean =false;
  eyeIcon: string = "fa-eye-slash";
  AddTeacherForm !: FormGroup;
  

  public teachers : TeacherModel[]=[];

  constructor(private api : ApiService , private router : Router , private auth :AuthService ){}


  ngOnInit(): void{
    this.getAllTeachers();
   
  }

  getAllTeachers(){
    this.api.ViewAllTeachers()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator= this.paginator;
        this.dataSource.sort= this.sort

      },
      error:(err)=>{
        alert("Error while fetching the records");
      }
    })
     
    
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  onDeleteTeacher(email:string){
    if(confirm('are you sure to delete')){
      this.api.deleteTeacher(email).subscribe
     ({
      next:(res)=>{
        alert("teacher deleted successfully");
        this.getAllTeachers();
      },
      error:()=>{
        alert("error while deleting teacher");
      }
     })
    }
  }



   
  editTeacher(row:any , teacherId: number){
    this.router.navigate(['UpdateTeacher'])
    
      this.api.putTeacher(row ,teacherId).subscribe({
        next:(res)=>{
          alert(res.message)
        },
        error:(err)=>{
          alert(err.error.message)
        }
      })
   

  }


  
  private validateAllFormFields(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if (control instanceof FormControl){
        control.markAsDirty({
          onlySelf: true
        });
      }
      else if(control instanceof FormGroup) 
      {
        this.validateAllFormFields(control)
      }
    })
  }

  



}
