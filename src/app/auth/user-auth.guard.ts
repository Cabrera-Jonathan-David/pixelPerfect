import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import { inject } from '@angular/core';

export const userAuthGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/home']);
    return false;
  }

  const payload = authService.decodeRol(token);
  if(payload && payload === 'client'){
    return true;
  }


  router.navigate(['/home']);
  return true;
};
