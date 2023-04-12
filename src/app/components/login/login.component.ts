import { Component  } from '@angular/core';
import {FormBuilder , FormControl , Validators , FormGroup} from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:FormGroup;
  isSubmit = false;
  constructor(private fb:FormBuilder ,
              private _authSer: AuthService,
              private _router:Router ,
              private _snackbar:MatSnackBar){

    this.loginForm = this.fb.group({
      email:[null ,[Validators.required , Validators.email]],
      password:[null ,[Validators.required , Validators.minLength(3)]],
    })

  
  }

  
  
  login(){
    this._authSer.login(this.loginForm.value).subscribe({
      next:(r)=>{
        this._authSer.isLoading.next(false)
        // console.log(r);
        if(r.message  == 'success'){
          this._router.navigate(['/']);
          localStorage.setItem('TOKEN' , r.token)
          this._authSer.setUserDetails()
        }else {
          this._snackbar.open('something went wrong' , '' , {
            horizontalPosition: 'right',
            verticalPosition:'bottom',
            duration: 2000
          })
        }
        
      }, error:()=>{
        this._authSer.isLoading.next(false)
      }
    })
    
  }


  get emailControl(){
    return this.loginForm.controls['email'];
  }

  get passwordControl(){
    return this.loginForm.controls['password'];
  }

  get emailErrorMsg(){
   return  this.emailControl.hasError('required') ? 
     "pls enter ur email" :
     this.emailControl.hasError('email') ? 
     'this email is not valid' :
     ''
  }
  get passwordErrorMsg(){
   return  this.passwordControl.hasError('required') ? 
     "pls enter ur password" :
     this.passwordControl.hasError('minlength') ? 
     'atleast 3 char' :
     ''
  }
 
}
