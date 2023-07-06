
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public unique_name : string ="";
  public role : string="";
  displayedColumns: string[] = ['studentId', 'email', 'name', 'dob' , 'phoneNo' , 'dateOfJoining','classId' ,'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private auth : AuthService  , private user: UserService ,private router : Router , private api : ApiService){}

  ngOnInit(): void {
    

    this.user.getFullName()
    .subscribe(val=>{
      let fullNameFromToken = this.auth.getUserNameFromToken();
      this.unique_name =val|| fullNameFromToken;
    })

    this.user.getRoleFromUSer()
    .subscribe(val => {
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  }

  Logout(){
    this.auth.logout();
  }

  onClickTeacher(){
    this.router.navigate(['ViewAllTeachers'])
  }

  onClickStudent(){
    this.router.navigate(['ViewAllStudents'])
  }

  
  getAllStudents(){
    this.api.ViewAllStudents()
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

}
