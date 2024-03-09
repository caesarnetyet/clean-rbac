import {inject} from "@angular/core";
import {CanActivateFn} from '@angular/router';
import {catchError, Observable, of} from "rxjs";
import {AuthService} from "../common/services/auth/auth.service";

export const authGuard: CanActivateFn = (route, state) :Observable<boolean> => {
  const authService = inject(AuthService)
  
  if (authService.user$.value) return of(true)

  return authService.fetchUser()
};
