import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserInterface} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = '/api/user';

  constructor(private http: HttpClient) {
  }


  getUsersByPeselFragment(peselFragment: string) {
    const params = new HttpParams().set('peselFragment', peselFragment);

    return this.http.get<UserInterface[]>(this.url, {params});
  }
}
