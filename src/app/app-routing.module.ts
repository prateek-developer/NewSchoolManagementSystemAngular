import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './Gaurds/auth.guard';
import { ViewAllTeachersComponent } from './components/view-all-teachers/view-all-teachers.component';
import { ViewAllStudentsComponent } from './components/view-all-students/view-all-students.component';
import { UpdateTeacherComponent } from './components/update-teacher/update-teacher.component';

const routes: Routes = [
  {path: 'Loginpage' , component: LoginComponent},
  {path: 'AddTeacher', component: AddTeacherComponent},
  {path:'AddStudent' , component: AddStudentComponent},
  {path: 'dashboard', component: DashboardComponent , canActivate:[AuthGuard]},
  {path: 'ViewAllTeachers', component:ViewAllTeachersComponent},
  {path: 'ViewAllStudents' , component: ViewAllStudentsComponent},
  {path:'UpdateTeacher', component:UpdateTeacherComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
