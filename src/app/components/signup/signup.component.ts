import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  singupForm: FormGroup;
  constructor(
    private fb: FormBuilder,
     private _auth: AuthService,
     private _router:Router ,
     private _snackBar: MatSnackBar) {
    this.singupForm = this.fb.group(
      {
        first_name: [null, [
          Validators.required,
          Validators.minLength(3),
        ]],
        last_name: [null, [
          Validators.required,
          Validators.minLength(3),
        ]],
        age:[null, [
          Validators.required,
          Validators.min(18),
        ]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [
          Validators.required,
          Validators.minLength(3),
        ]],
        // rePassword: new FormControl(null, [
        //   Validators.required,
        //   Validators.minLength(3),
        // ]),
      },
      // {
      //   validators: this.missMacth('password', 'rePassword'),
      // }
    );
  }

 

  singup() {
    this._auth.signup(this.singupForm.value).subscribe({
      next: (r) => {
        this._auth.isLoading.next(false);
        if(r.message === 'success') {
          this._router.navigate(['/login'])
        }else {
          // alert(r.message)
          this.openSnackBar('this email already exist')
        }
      },
      error: (err) => {
        this._auth.isLoading.next(false);
        // console.log(err.message);
        alert(err.message)
      },
    });
  }

  get first_nameControl() {
    return this.singupForm.get('first_name');
  }
  
  get last_nameControl() {
    return this.singupForm.get('last_name');
  }
  get emailControl() {
    return this.singupForm.get('email');
  }
  get ageControl() {
    return this.singupForm.get('age');
  }
  get passwordControl() {
    return this.singupForm.get('password');
  }
  // get rePasswordControl() {
  //   return this.singupForm.controls['rePassword'];
  // }

  // missMacth(password: string, repassword: string) {
  //   return (formGroup: FormGroup)=> {
  //     const passwordCon = formGroup.controls[password];
  //     const rePasswordCon = formGroup.controls[repassword];
  //     if (rePasswordCon.errors && !rePasswordCon.errors['mismatch']) {
  //       return;
  //     }
  //     if (passwordCon.value !== rePasswordCon.value) {
  //       rePasswordCon.setErrors({ mismatch: true });
  //     } else {
  //       rePasswordCon.setErrors(null);
  //     }
  //   };
  // }
 

  get firstNameErrorMessage(){
    return this.first_nameControl?.hasError('required') ?
     "this input is required" :
     this.first_nameControl?.hasError('minlength') ?
     'must be atleast 3 chars' :
     ''
  }
  get lastNameErrorMessage(){
    return this.last_nameControl?.hasError('required') ?
     "this input is required" :
     this.last_nameControl?.hasError('minlength') ?
     'must be atleast 3 chars' :
     ''
  }
  get emailErrorMessage(){
    return this.emailControl?.hasError('required') ?
     "this input is required" :
     this.emailControl?.hasError('email') ?
     'not valid email' :
     ''
  }
  get passwordErrorMessage(){
    return this.passwordControl?.hasError('required') ?
     "this input is required" :
     this.passwordControl?.hasError('minlength') ?
     'must be atleast 3 chars' :
     ''
  }
  get ageErrorMessage(){
    return this.ageControl?.hasError('required') ?
     "this input is required" :
     this.ageControl?.hasError('min') ?
     'must be atleast 18 years old' :
     ''
  }

  openSnackBar(msg:string) {
    this._snackBar.open(msg , '', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 3000
    });
  }
}
