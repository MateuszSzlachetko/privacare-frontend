import {inject} from "@angular/core";
import {Auth, user} from "@angular/fire/auth";
import {CanActivateFn} from "@angular/router";
import {filter, from, map, Observable, of, switchMap} from "rxjs";

export const adminGuard: CanActivateFn = () => {
  return isAdmin();
}

export const isAdmin = (): Observable<boolean> => {
  const auth = inject(Auth);
  const user$ = user(auth);

  return user$.pipe(
    filter((currentUser) => currentUser !== undefined),
    switchMap(currentUser => {
      if (!currentUser)
        return of(false);

      return from(currentUser.getIdTokenResult()).pipe(
        map((token) => !!token.claims['isAdmin'])
      );
    })
  )
}
