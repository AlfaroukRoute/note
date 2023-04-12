import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError   } from 'rxjs';
import { retry , catchError  } from 'rxjs/operators';
import { User } from '../Model/user';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDetails: BehaviorSubject<any> = new BehaviorSubject(null);
  baseUrl = 'https://sticky-note-fe.vercel.app'; 
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

 
  constructor(private _httpClient: HttpClient,
              private _router:Router) { 
    this.setUserDetails();
  }

  login(user:User ):Observable<any>{
    this.isLoading.next(true);
    return this._httpClient.post(`${this.baseUrl}/signin` , user).pipe(
      retry(3),
      catchError(this.handleError)
    )
  }
  
  signup(user:User ):Observable<any>{
    this.isLoading.next(true);
    return this._httpClient.post(`${this.baseUrl}/signup` , user).pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  logOuT(){
    localStorage.removeItem('TOKEN');
    this.userDetails.next(null);
    this._router.navigate(['/login'])
  }

  setUserDetails(){
    if(localStorage.getItem('TOKEN')) {
      let token = localStorage.getItem('TOKEN');
      let decoded:any = jwt_decode(token!);
      localStorage.setItem('USERID' , decoded._id)
      this.userDetails.next(decoded);     
    }
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
