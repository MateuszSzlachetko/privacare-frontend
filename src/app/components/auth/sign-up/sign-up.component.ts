import {Component, inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Auth, createUserWithEmailAndPassword} from "@angular/fire/auth";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  isLoading: boolean = false;
  signupForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  showPassword: boolean = false;
  auth: Auth = inject(Auth);
  error: string = '';
  success: string = '';


  constructor(private fb: FormBuilder) {
  }

  onSubmit() {
    if (!this.signupForm.valid) {
      return;
    }
    const email = this.signupForm.controls.email.value;
    const password = this.signupForm.controls.password.value;

    if (!email || !password)
      return;

    createUserWithEmailAndPassword(this.auth, email, password)
      .then(user => {
        this.success = 'Successfully created account'
      }).catch((error) => {
      if (error.code === 'auth/email-already-in-use')
        this.error = 'Email is already in use';
      if (error.code === 'auth/invalid-email')
        this.error = 'Email format is unrecognized';
      if (error.code === 'auth/weak-password')
        this.error = 'Weak password, it should be at least 6 characters long';
    }).finally(() => {
      setTimeout(() => {
        this.success = '';
        this.error = '';
      }, 4000)
    })
  }
}
