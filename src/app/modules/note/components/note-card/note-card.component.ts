import {Component, Input, OnInit} from '@angular/core';
import {NoteInterface} from "../../../../core/interfaces/note.interface";
import {UserService} from "../../../../core/services/user.service";
import {UserInterface} from "../../../../core/interfaces/user.interface";
import {delay} from "rxjs";
import {DeleteConfirmationComponent} from "../../../../components/delete-confirmation/delete-confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {NoteService} from "../../../../core/services/note.service";

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  @Input({required: true}) note!: NoteInterface;
  creator: UserInterface = this.userService.getBlankUser();
  isLoading: boolean = false;

  constructor(private dialog: MatDialog,
              private userService: UserService,
              private noteService: NoteService,
              private router: Router) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.userService.getUserById(this.note.creatorId).pipe(delay(300)).subscribe(user => {
      this.isLoading = false;
      this.creator = user;
    })
  }

  onDelete() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: 'Are you sure you want to delete this note?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm')
        this.noteService.deleteNote(this.note.id);
    });
  }

  onEdit() {
    this.router.navigate(['note/edit', this.note.id]).then(() => {
    });
  }
}
