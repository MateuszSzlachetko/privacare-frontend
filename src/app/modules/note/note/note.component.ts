import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {UserService} from "../../../core/services/user.service";
import {UserInterface} from "../../../core/interfaces/user.interface";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {NoteInterface} from "../../../core/interfaces/note.interface";
import {NoteService} from "../../../core/services/note.service";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  myControl = new FormControl('');
  users: UserInterface[] = [];
  notes!: NoteInterface[];
  selectedPatient!: UserInterface;

  constructor(private userService: UserService, private noteService: NoteService) {
  }


  ngOnInit() {
    this.myControl.valueChanges.subscribe(value => {
      if (value === '')
        this.notes = [];

      if (!this.isDigitsOnly(value))
        return;

      if (value !== '' && value)
        this.userService.getUsersByPeselFragment(value).subscribe(data => {
          this.users = data;
        })
    })
  }

  optionSelected($event: MatAutocompleteSelectedEvent) {
    this.selectedPatient = $event.option.value;

    this.noteService.getNotesByPatientId(this.selectedPatient.id).subscribe(data => {
      this.notes = data;
    })
  }

  displayUser(user: UserInterface): string {
    if (!user)
      return '';

    return `${user.name} ${user.surname} ${user.pesel}`
  }


  private isDigitsOnly(value: string | null) {
    const regex = /^[0-9]+$/;
    return regex.test(value || '');
  }
}
