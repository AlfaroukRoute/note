import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  baseUrl:string = 'https://sticky-note-fe.vercel.app';
  allNotes : BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private _http: HttpClient) { }
  getAllNotes():Observable<any>{
    console.log('hi from get all notes');
    
    let data = {
      token: localStorage.getItem('TOKEN'),
      userID:  localStorage.getItem('USERID'),
    }; 
    return this._http.post(`${this.baseUrl}/getUserNotes` , data)
  }

  addNote(formValue: any):Observable<any>{
    let data = {
      ...formValue,
      token: localStorage.getItem('TOKEN'),
      citizenID: localStorage.getItem('USERID'),
    };
    return this._http.post( `${this.baseUrl}/addNote`, data);
  }
  updateNote(formValue: any):Observable<any>{

    let data = {
      ...formValue,
      token: localStorage.getItem('TOKEN'),
      NoteID: JSON.parse(localStorage.getItem('currentNote')!)._id,
    };
    return this._http.put( `${this.baseUrl}/updateNote`, data);
  }
  deleteNote():Observable<any>{
    let data = {
      token: localStorage.getItem('TOKEN'),
      NoteID: JSON.parse(localStorage.getItem('currentNote')!)._id,
    };
    return this._http.delete( `${this.baseUrl}/deleteNote`, {
      body:data
    });
  }
}
