import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, EmailValidator } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {

  
  type: string ="password";
  isText: boolean =false;
  eyeIcon: string = "fa-eye-slash";
  AddStudentForm !: FormGroup;
  
  constructor(private fb: FormBuilder , private auth: AuthService) {}
  
  ngOnInit(): void {
  
      this.AddStudentForm = this.fb.group({
        Name: ['' , Validators.required],
      
        ClassId:['', Validators.required],
        Dob:['', Validators.required],
      Email: ['' ,Validators.required],
      Password: ['' ,Validators.required],
      PhoneNo:['', Validators.required],
      Status:['', Validators.required],
      DateOfJoining: ['', Validators.required],


    })
    
  }
  
  
    hideshowPassword(){
      this.isText =!this.isText;
      this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
      this.isText ? this.type ="text" : this.type = "password"; 
  
    }
  
    OnAddStudent(){
      if(this.AddStudentForm.valid){
  
        console.log(this.AddStudentForm.value)
        //send the object to database
        this.auth.AddStudent(this.AddStudentForm.value).subscribe({
          next:(res)=>{
            alert(res.message("user added"))
          },
          error:(err)=>{
            alert(err.error.message)
          }
        })
      }
      else{
  
        console.log("form is invalid")
        //throw errors
  
        this.validateAllFormFields(this.AddStudentForm);
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
