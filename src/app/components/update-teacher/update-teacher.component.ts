import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.css']
})
export class UpdateTeacherComponent implements OnInit {
  
  type: string ="password";
  isText: boolean =false;
  eyeIcon: string = "fa-eye-slash";
 
  
  editTeacher = new FormGroup({
    Name: new FormControl(''),
    SubjectTaught: new FormControl(''),
    Salary: new FormControl(''),
    Dob: new FormControl(''),
   Email: new FormControl(''),
   Password: new FormControl(''),

  })
  
  constructor(private fb: FormBuilder , private auth: AuthService , private router : ActivatedRoute , private api : ApiService) {}
  
  ngOnInit(): void {
  console.warn(this.router.snapshot.params['teacherId'])
  this.api.getcurrentTeacher(this.router.snapshot.params['teacherId'].subscribe(
    (result:any)=>{
      console.warn(result)
    }
  ))
   
    
  }
  
  
  
 
 
  
    public validateAllFormFields(formGroup: FormGroup){
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
     
    hideshowPassword(){
      this.isText =!this.isText;
      this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
      this.isText ? this.type ="text" : this.type = "password"; 
  
    }

}
