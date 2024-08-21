import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './authentication/auth.service';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  // return false;
  return router.navigate(['/authentication/login']);
}



export const RoleGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  if (authService.isLogged){
    return true
  }
  return router.navigate(['/authentication/login']);
  // return false; 
}



