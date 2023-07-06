import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {


    type: string ="password";
    isText: boolean =false;
    eyeIcon: string = "fa-eye-slash";
    AddTeacherForm !: FormGroup;
    
    constructor(private fb: FormBuilder , private auth: AuthService) {}
    
    ngOnInit(): void {
    
        this.AddTeacherForm = this.fb.group({
          Name: ['' , Validators.required],
          SubjectTaught: ['' , Validators.required],
          Salary:['', Validators.required],
          Dob:['', Validators.required],
        Email: ['' ,Validators.required],
        Password: ['' ,Validators.required]
      })
      
    }
    
    
      hideshowPassword(){
        this.isText =!this.isText;
        this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
        this.isText ? this.type ="text" : this.type = "password"; 
    
      }
    
      OnAddTeacher(){
        if(this.AddTeacherForm.valid){
    
          console.log(this.AddTeacherForm.value)
          //send the object to database
          this.auth.AddTeacher(this.AddTeacherForm.value).subscribe({
            next:(res)=>{
              alert(res.message)
            },
            error:(err)=>{
              alert(err.error.message)
            }
          })
        }
        else{
    
          console.log("form is invalid")
          //throw errors
    
          this.validateAllFormFields(this.AddTeacherForm);
          alert("Your form is invalid");
        }
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
