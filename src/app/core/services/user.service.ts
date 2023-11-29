import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserInterface} from "../interfaces/user.interface";
import {ReplaySubject} from "rxjs";
import {Auth, user} from "@angular/fire/auth";

interface User {
  user: UserInterface;
  user$: ReplaySubject<UserInterface>
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = '/api/users';
  users: User[] = [];
  auth = inject(Auth);
  user$ = user(this.auth);
  currentUser: UserInterface = this.getBlankUser();
  currentUserId$ = new ReplaySubject<string>();


  constructor(private http: HttpClient) {
    this.user$.subscribe(authUser => {
      if (authUser === null) {
        this.currentUser = this.getBlankUser();
        this.currentUserId$.next(this.currentUser.id)
        return;
      }

      this.fetchUserByAuthId(authUser.uid);
    })
  }

  getCurrentUserId() {
    return this.currentUserId$.asObservable();
  }

  getUsersByPeselFragment(peselFragment: string) {
    const params = new HttpParams().set('peselFragment', peselFragment);

    return this.http.get<UserInterface[]>(this.url, {params});
  }

  getUserById(id: string) {
    const i = this.users.findIndex(u => u.user.id === id)
    if (i !== -1) {
      return this.users[i].user$.asObservable();
    }

    const newIndex = this.users.push({
      user: this.getBlankUser(),
      user$: new ReplaySubject<UserInterface>(1)
    }) - 1;

    this.fetchUserById(id, newIndex);

    return this.users[newIndex].user$.asObservable();
  }

  private fetchUserById(id: string, newIndex: number) {
    const idUrl = `${this.url}/${id}`
    return this.http.get<UserInterface>(idUrl).subscribe(data => {
      this.users[newIndex].user = data;
      this.users[newIndex].user$.next(data);
    })
  }

  getBlankUser() {
    return {
      id: '',
      authId: '',
      createdAt: new Date(),
      name: '',
      surname: '',
      pesel: '',
      phoneNumber: '',
    }
  }

  private fetchUserByAuthId(authId: string) {
    const params = new HttpParams().set('authId', authId);
    return this.http.get<UserInterface>(this.url, {params: params}).subscribe(data => {
      this.currentUser = data;
      this.currentUserId$.next(this.currentUser.id);
    })
  }
}
