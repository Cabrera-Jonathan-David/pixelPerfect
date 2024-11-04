import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarjetaService } from '../../Services/tarjeta.service';

@Component({
  selector: 'app-formulario-tarjeta',
  templateUrl: './formulario-tarjeta.component.html',
  styleUrls: ['./formulario-tarjeta.component.css']
})
export class FormularioTarjetaComponent {
  tarjetaForm: FormGroup;
  mensajeExito: string = '';

  constructor(private fb: FormBuilder, private tarjetaService: TarjetaService) {
    this.tarjetaForm = this.fb.group({
      nombreTitular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      fechaExpiracion: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    });
  }

  enviarFormulario() {
    if (this.tarjetaForm.valid) {
      this.tarjetaService.validarTarjeta(this.tarjetaForm.value).subscribe(response => {
        if (response && response.length > 0) {
          this.mensajeExito = 'Pago realizado con éxito';
        } else {
          this.mensajeExito = 'Datos de la tarjeta inválidos';
        }
      });
    } else {
      this.mensajeExito = 'Formulario inválido';
    }
  }

  formatCardNumber(value: string): string {
    if (!value) return '';
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1-').trim().slice(0, -1); // Agregado: Formato con guiones
  }


  updateCardDisplay() {
    this.tarjetaForm.get('numeroTarjeta')?.setValue(this.tarjetaForm.get('numeroTarjeta')?.value.replace(/-/g, '')); // Eliminar guiones al guardar
  }


}