import {inject} from "@angular/core";
import {CanActivateFn} from '@angular/router';
import {UserRole} from "../common/services/auth.contract";
import {AuthService} from "../common/services/auth/auth.service";

export const adminGuard: CanActivateFn = (route, state) => {

  const user = inject(AuthService).user$.value
  if (!user) return false;
  if (user.role !== UserRole.Admin) return false;
  return true;
};
