import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function mayorDeEdadValidator(): ValidatorFn {

    return(control: AbstractControl): ValidationErrors | null => {

        const fechaNacimiento = control.value;

        if (!fechaNacimiento) { //si no hay fecha no valida.-
            return null;
        }

        const hoy = new Date();
        const fechaNacimientoDate = new Date(fechaNacimiento);
        const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
        const mes = hoy.getMonth() - fechaNacimientoDate.getMonth();

        const esMayorDeEdad = (edad > 18 || (edad === 18 && mes >= 0)) ? null : {menorDeEdad: true};

        return esMayorDeEdad;

    }


}