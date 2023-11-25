import {Component, inject, OnInit} from '@angular/core';
import {Auth, signInWithEmailAndPassword} from "@angular/fire/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'privacare';
  // auth: Auth = inject(Auth);
  //
  // ngOnInit() {
  //   signInWithEmailAndPassword(this.auth, '', '').then((u) => {
  //     console.log(u.user.getIdTokenResult())
  //     console.log(u.user.getIdTokenResult().then(t => {
  //       console.log(t.claims['isAdmin'])
  //     }))
  //   })
  // }
}
