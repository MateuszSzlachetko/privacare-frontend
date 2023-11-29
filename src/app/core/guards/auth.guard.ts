import {inject} from "@angular/core";
import {Auth, user} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {filter, map, Observable} from "rxjs";

export const authGuard = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  const user$ = user(auth);

  return user$.pipe(
    filter((currentUser) => currentUser !== undefined),
    map(currentUser => {
      if (!currentUser) {
        router.navigateByUrl('/auth/login');
        return false;
      }
      return true;
    })
  );
}

export const isLoggedIn = (): Observable<boolean> => {
  const auth = inject(Auth);
  const user$ = user(auth);

  return user$.pipe(
    filter((currentUser) => currentUser !== undefined),
    map(currentUser => !!currentUser)
  )
}
