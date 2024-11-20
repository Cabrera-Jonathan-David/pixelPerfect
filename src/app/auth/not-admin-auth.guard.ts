import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';

export const notAdminAuthGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (!token) {
    return true;
  }

  const payload = authService.decodeRol(token);
  if(payload && payload !== 'admin'){
    return true;
  }

  router.navigate(['admin/list-products']);
  return false;
};
