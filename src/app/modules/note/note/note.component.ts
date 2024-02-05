import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {UserService} from "../../../core/services/user.service";
import {UserInterface} from "../../../core/interfaces/user.interface";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {NoteInterface} from "../../../core/interfaces/note.interface";
import {NoteService} from "../../../core/services/note.service";
import {debounceTime, delay} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  searchControl = new FormControl('');
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
          this.searchControl.setValue(`${user.name} ${user.surname} ${user.pesel}`)
        })
      }

      if (!params['patientId']) {
        this.searchControl.reset('');
      }
    });

    this.searchControl.valueChanges.subscribe(value => {
      if (value === '')
        this.router.navigate(['/note']).then();
    })

    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.getUsers(value || '');
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

  getUsers(peselFragment: string): void {
    if (!this.isDigitsOnly(peselFragment))
      return;

    if (peselFragment !== '' && peselFragment)
      this.userService.getUsersByPeselFragment(peselFragment).subscribe(data => {
        this.users = data;
      })
  }

  private isDigitsOnly(value: string): boolean {
    const regex = /^[0-9]+$/;
    return regex.test(value);
  }
}
