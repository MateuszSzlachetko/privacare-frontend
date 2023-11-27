import {Component, inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Auth, signInWithEmailAndPassword} from "@angular/fire/auth";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  isLoading: boolean = false;
  loginForm = this.fb.group({
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
    if (!this.loginForm.valid) {
      return;
    }
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;

    if (!email || !password)
      return;

    signInWithEmailAndPassword(this.auth, email, password)
      .then(user => {
        this.success = 'Successfully logged in'
      }).catch((error) => {
      console.log(error.code)
      if (error.code === 'auth/invalid-login-credentials')
        this.error = 'Invalid email or password';
    }).finally(() => {
      setTimeout(() => {
        this.success = '';
        this.error = '';
      }, 4000)
    })
  }
}
