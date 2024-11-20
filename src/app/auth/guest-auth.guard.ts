
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';


export const guestAuthGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);


  const clientId = localStorage.getItem('clientId');

  if (!clientId) {
    router.navigate(['/home']);
    return false;
  }

  const isRegistered = await authService.isClientRegistered(clientId);

  if (!isRegistered) {
    return true;
  }

  
  return true; 

};
