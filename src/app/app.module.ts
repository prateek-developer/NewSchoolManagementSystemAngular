import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewAllTeachersComponent } from './components/view-all-teachers/view-all-teachers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewAllStudentsComponent } from './components/view-all-students/view-all-students.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { NoticeComponent } from './components/notice/notice.component';
import { UpdateTeacherComponent } from './components/update-teacher/update-teacher.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddTeacherComponent,
    AddStudentComponent,
    DashboardComponent,
    ViewAllTeachersComponent,
    ViewAllStudentsComponent,
    NoticeComponent,
    UpdateTeacherComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatIconModule
  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
