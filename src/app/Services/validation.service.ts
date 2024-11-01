import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(
    private clientService: ClientService,
    private userService: UserService
  ) {}

  checkDniExistsAsync(): AsyncValidatorFn {
    return async (control: AbstractControl) => {
      if (!control.value) {
        return null; // No validar si no hay valor
      }

      try {
        const existingDni = await this.clientService.checkDniExists(
          control.value
        );
        return existingDni ? { dniExists: true } : null; // Devuelve un objeto de error si el DNI existe
      } catch (error) {
        console.error('Error verificando DNI:', error);
        return null; // Si hay un error, no marcamos el control como inválido
      }
    };
  }

  // Validación para el email
  checkEmailExistsAsync(): AsyncValidatorFn {
    return async (control: AbstractControl) => {
      if (!control.value) {
        return null; // No validar si no hay valor
      }

      try {
        const existingEmail = await this.clientService.checkUserEmailExists(
          control.value
        );
        return existingEmail ? { emailExists: true } : null; // Devuelve un objeto de error si el email existe
      } catch (error) {
        console.error('Error verificando email:', error);
        return null; // Si hay un error, no marcamos el control como inválido
      }
    };
  }

  checkUsernameExistsAsync(): AsyncValidatorFn {
    return async (control: AbstractControl) => {
      if (!control.value) {
        return null; // No validar si no hay valor
      }

      try {
        const existingUser = await this.userService.checkUsernameExists(
          control.value
        );
        return existingUser ? { usernameExists: true } : null; // Devuelve un objeto de error si el usuario existe
      } catch (error) {
        console.error('Error verificando nombre de usuario:', error);
        return null; // Si hay un error, no marcamos el control como inválido
      }
    };
  }
}
