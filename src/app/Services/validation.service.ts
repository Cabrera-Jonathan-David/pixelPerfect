import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(
    private clientService : ClientService,
    private userService: UserService
  ) { }

  // VALIDADOR ASINCRONICO PARA VERIFICAR QUE NO EXISTA UN DNI REPETIDO EN UN USER
  dniValidator(clientService: ClientService): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
        const dni = control.value;

        // Solo validar si el campo no está vacío
        if (!dni) {
            return null; // No hay error si el campo está vacío
        }

        const result = await clientService.validateDni(dni);
        return result.exists ? { dniExists: true } : null; // Retorna un error si existe
    };
  }

  // VALIDADOR ASINCRONICO PARA VERIFICAR QUE NO EXISTA UN DNI REPETIDO EN UN USER
  emailValidator(clientService: ClientService): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
        const email = control.value;

        // Solo validar si el campo no está vacío
        if (!email) {
            return null; // No hay error si el campo está vacío
        }

        const result = await clientService.validateEmail(email);
        return result.exists ? { emailExists: true } : null; // Retorna un error si existe
    };
  }


  // VALIDADOR ASINCRONICO PARA VERIFICAR QUE NO EXISTA UN USERNAME REPETIDO
  checkUsernameExistsAsync(): AsyncValidatorFn {
    return async (control: AbstractControl) => {
      if (!control.value) {
        return null; // No validar si no hay valor
      }

      try {
        const existingUser = await this.userService.checkUsernameExists(control.value);
        return existingUser ? { usernameExists: true } : null; // Devuelve un objeto de error si el usuario existe
      } catch (error) {
        console.error('Error verificando nombre de usuario:', error);
        return null; // Si hay un error, no marcamos el control como inválido
      }
    };
  }

  // VALIDADOR PARA VERIFICAR SI ES MAYOR DE EDAD, NO ASINCRONICO
  mayorDeEdadValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const fechaNacimiento = control.value;

        if (!fechaNacimiento) {
            return null; 
        }

        const hoy = new Date();
        const fechaNacimientoDate = new Date(fechaNacimiento);

        if (isNaN(fechaNacimientoDate.getTime())) {
            return null;
        }

        const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
        const mes = hoy.getMonth() - fechaNacimientoDate.getMonth();
        const dia = hoy.getDate() - fechaNacimientoDate.getDate();

        if (edad < 18 || (edad === 18 && (mes < 0 || (mes === 0 && dia < 0)))) {
            return { menorDeEdad: true }; 
        }

        return null; 
    };

}


}
