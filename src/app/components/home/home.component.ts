import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { MatDialog } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { NoteDialog } from '../NoteDialog/NoteDialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  notes: any;
  constructor(
    private _noteSer: NoteService,
    public dialog: MatDialog,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.getAllNotes();
    this._noteSer.allNotes.subscribe((r)=>{
      this.notes = r; 
    })
  }

  getAllNotes() {
    this._noteSer.getAllNotes().subscribe({
      next: (r) => {
        if (r.message == 'no notes found') {
          this._snackBar.open('there is notes yet' , '' , {
            duration: 1000
          })
        } else {
          this.notes = r.Notes;
        }
      },
    });
  }

  openDialog(enter: string, exit: string, mode: string , note?:any): void {
    if(note) localStorage.setItem('currentNote' ,JSON.stringify(note));
    this._router.navigate(['/'], { queryParams: { mode } });
    this.dialog.open(NoteDialog, {
      width: '500px',
      enterAnimationDuration: enter,
      exitAnimationDuration: exit,
    });
  }
}

