import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
import {Auth, idToken} from "@angular/fire/auth";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = inject(Auth);
    const idToken$ = idToken(auth);

    return idToken$.pipe(
      take(1),
      switchMap(token => {
        if (token) {
          const modifiedRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(modifiedRequest);
        }

        return next.handle(request);
      })
    );
  }
}
