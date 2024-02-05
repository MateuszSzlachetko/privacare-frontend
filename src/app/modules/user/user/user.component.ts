import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../core/services/user.service";
import {UserInterface, UserRequest} from "../../../core/interfaces/user.interface";
import {HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  isLoading: boolean = false;
  displaySuccess: boolean = false;
  displayError: boolean = false;
  errors: string[] = [];
  currentUser: UserInterface = this.userService.getBlankUser();
  userForm = this.fb.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    pesel: ['', [Validators.required]], // add validation
    phoneNumber: ['', [Validators.required]], // add validation
  });


  constructor(private fb: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.userForm.setValue({
        name: user.name,
        surname: user.surname,
        pesel: user.pesel,
        phoneNumber: user.phoneNumber
      })
    })
  }

  onSubmit() {
    if (!this.userForm.valid) {
      return;
    }

    this.userService.getCurrentUserAuthId().subscribe(id => {
        const userRequest: UserRequest = {
          authId: id,
          name: this.userForm.controls.name.value || '',
          surname: this.userForm.controls.surname.value || '',
          pesel: this.userForm.controls.pesel.value || '',
          phoneNumber: this.userForm.controls.phoneNumber.value || '',
        }

        this.addUser(userRequest);
      }
    )
  }

  addUser(userRequest: UserRequest) {
    this.userService.addUser(userRequest).subscribe(response => {
        this.isLoading = false;
        if (response.status === HttpStatusCode.Created) {
          this.onSuccess();
        }
        if (response.status === HttpStatusCode.BadRequest) {
          this.onError(response.messages)
        }
      }
    )
  }

  onSuccess() {
    this.displaySuccess = true;
    setTimeout(() => {
      this.displaySuccess = false;
    }, 2500)
  }

  onError(messages: string[]) {
    this.displayError = true;
    this.errors = messages;
    setTimeout(() => {
      this.displayError = false;
    }, 6000)
  }
}
