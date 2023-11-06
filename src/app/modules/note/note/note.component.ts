import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {UserService} from "../../../core/services/user.service";
import {UserInterface} from "../../../core/interfaces/user.interface";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {NoteInterface} from "../../../core/interfaces/note.interface";
import {NoteService} from "../../../core/services/note.service";
import {delay} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

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
  isLoading: boolean = false;

  constructor(private userService: UserService,
              private noteService: NoteService,
              private router: Router,
              private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.notes = [];
      this.selectedPatient = this.userService.getBlankUser();
      this.users = [];
      if (params['patientId']) {
        const id = params['patientId'];
        this.getNotes(id);
        this.userService.getUserById(id).subscribe(user => {
          this.users.push(user);
          this.selectedPatient = user;
          this.myControl.setValue(`${user.name} ${user.surname} ${user.pesel}`)
        })
      }

      if (!params['patientId']) {
        this.myControl.reset('');
      }
    });

    this.myControl.valueChanges.subscribe(value => {
      if (value === '')
        this.router.navigate(['/note']).then();

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
    this.router.navigate(['/note'], {queryParams: {patientId: this.selectedPatient.id}})
      .then(r => r ? this.notes = [] : null);
  }

  displayInput(user: UserInterface | string): string {
    if (typeof user === 'string')
      return user;

    return !user ? '' : `${user.name} ${user.surname} ${user.pesel}`
  }

  getNotes(patientId: string) {
    this.isLoading = true;
    this.noteService.getNotesByPatientId(patientId).pipe(delay(500))
      .subscribe(data => {
        this.notes = data;
        this.isLoading = false;
      })
  }

  private isDigitsOnly(value: string | null) {
    const regex = /^[0-9]+$/;
    return regex.test(value || '');
  }
}
