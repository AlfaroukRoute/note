import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { concat, concatMap } from 'rxjs';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'note-dialog',
  templateUrl: './NoteDialog.components.html',
})
export class NoteDialog implements OnInit {
  noteForm: FormGroup;
  heading: string = '';
  noteToUpdate: any;
  isDeleteMode: boolean = false;

  constructor(
    private _noteSer: NoteService,
    public dialogRef: MatDialogRef<NoteDialog>,
    private _router: Router,
    private _activeRouter: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required]],
      desc: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this._activeRouter.queryParamMap.subscribe((query) => {
      //1-get the heading
      this.heading = query.get('mode')!;
      // 2-if its is the upadte mode set up the form
      if (this.heading == 'update') {
        this.setUpUpdate();
      } else if (this.heading == 'delete') {
        this.isDeleteMode = true;
      }
    });

    //at end of the dialog lets clear the query "mode" and get all notes again
    this.dialogRef.afterClosed().subscribe((result) => {
      this._router.navigate(['/']);
    });
  }
  //check if its update or add
  sumit() {
    if (this.heading === 'update') {
      this.updateNote();
    } else if (this.heading === 'add') {
      this.addNote();
    }

    this.dialogRef.close();
  }
  setUpUpdate() {
    this.noteToUpdate = JSON.parse(localStorage.getItem('currentNote')!);
    console.log(this.noteToUpdate);
    this.noteForm.patchValue(this.noteToUpdate);
  }

  updateNote() {
    concat(
      this._noteSer.updateNote(this.noteForm.value),
      this._noteSer.getAllNotes()
    ).subscribe((r) => {
      if (r.message === 'success') this._noteSer.allNotes.next(r.Notes);
    });
  }

  addNote() {
    concat(
      this._noteSer.addNote(this.noteForm.value),
      this._noteSer.getAllNotes()
    ).subscribe((r) => {
      if (r.message === 'success') this._noteSer.allNotes.next(r.Notes);
    });
  }

  deleteNote() {
    concat(this._noteSer.deleteNote(), this._noteSer.getAllNotes()).subscribe(
      (r) => {
        console.log(r);
        if (r.message === 'success' || r.message === 'no notes found') {
          this._noteSer.allNotes.next(r.Notes);
          this.dialogRef.close();
        }
      }
    );
  }
}
