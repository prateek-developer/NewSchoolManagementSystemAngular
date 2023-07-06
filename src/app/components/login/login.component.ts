import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
type: string ="password";
isText: boolean =false;
eyeIcon: string = "fa-eye-slash";
loginForm !: FormGroup;

constructor(private fb: FormBuilder , private auth: AuthService , private router : Router , private user : UserService) {}

ngOnInit(): void {

    this.loginForm = this.fb.group({
    username: ['' ,Validators.required],
    password: ['' ,Validators.required]
  })
  
}


  hideshowPassword(){
    this.isText =!this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type ="text" : this.type = "password"; 

  }

  OnSubmit(){
    if(this.loginForm.valid){

      //yconsole.log(this.loginForm.value)
      //send the object to database
      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{
          alert(res.message)
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          const tokenPayLoad = this.auth.decodeToken();
          this.user.setFullName(tokenPayLoad.unique_name);
          this.user.setRoleForUSer(tokenPayLoad.role);
          this.router.navigate(['dashboard'])

        },
        error:(err)=>{
          alert(err.error.message)
        }
       
      })
      
    } 
     
    else{

      console.log("form is invalid")
      //throw errors

      this.validateAllFormFields(this.loginForm);
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
