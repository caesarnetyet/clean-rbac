import { inject } from '@angular/core';
import { AuthService } from '../common/services/auth/auth.service';
import { UserRole } from '../common/services/auth.contract';
import { CanActivateFn } from '@angular/router';

export const coordinatorGuard: CanActivateFn = (route, state) => {
  const user = inject(AuthService).user$.value
  if (!user) return false;
  if (user.role !== UserRole.Coordinator) return false;
  return true;
};