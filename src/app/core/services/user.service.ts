import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode} from "@angular/common/http";
import {UserInterface, UserRequest} from "../interfaces/user.interface";
import {map, Observable, ReplaySubject} from "rxjs";
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
  currentUser$ = new ReplaySubject<UserInterface>();


  constructor(private http: HttpClient) {
    this.user$.subscribe(authUser => {
      if (authUser === null) {
        this.currentUser = this.getBlankUser();
        this.currentUser$.next(this.currentUser)
        return;
      }

      this.fetchUserByAuthId(authUser.uid);
    })
  }

  getCurrentUser() {
    return this.currentUser$.asObservable();
  }

  getCurrentUserAuthId() {
    return this.user$.pipe(
      map(user => user?.uid || ''),
    )
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
      this.currentUser$.next(this.currentUser);
    })
  }

  addUser(userRequest: UserRequest) {
    return new Observable<{ status: HttpStatusCode, messages: string[] }>((observer) => {
      this.http.post<UserInterface>(this.url, userRequest).subscribe({
        next: (response: UserInterface) => {
          observer.next({status: HttpStatusCode.Created, messages: []})
          this.fetchUserByAuthId(response.authId);
        },
        error: (error: HttpErrorResponse) => {
          observer.next({status: HttpStatusCode.BadRequest, messages: [...error.error.messages]})
        },
        complete: () => {
          observer.complete()
        }
      });
    });

  }
}
