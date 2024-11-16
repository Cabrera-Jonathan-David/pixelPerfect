import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';
import { ClientService } from '../../Services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../Interface/client';
import { ValidationService } from '../../Services/validation.service';

@Component({
  selector: 'app-pre-payment',
  templateUrl: './pre-payment.component.html',
  styleUrl: './pre-payment.component.css'
})


export class PrePaymentComponent implements OnInit {


  isLoggedIn = false;
  guestForm: FormGroup;
  isFormVisible: boolean = false;
  redirectTo: string = '/prepayment';

  client: Client = {
    email: '',
    nombre: '',
    apellido: '',
    dni: '',
    fechaNacimiento: '',
    codigoArea: '',
    telefono: null,
    direccion: '',
    altura: null,
    piso: '',
    codigoPostal: '',
    ciudad: '',
    provincia: '',
    pais: ''
  };

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private clientService: ClientService,
    private fb: FormBuilder,
    private validationService: ValidationService,
   ){
      this.guestForm = this.fb.group({
      email: ['', [Validators.required, Validators.email], [this.validationService.emailValidator(this.clientService)]],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)], [this.validationService.dniValidator(this.clientService)]],
      fechaNacimiento: ['', [Validators.required, this.validationService.mayorDeEdadValidator()]],
      codigoArea: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      direccion: ['', Validators.required],
      altura: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      piso: [''],
      codigoPostal: ['', [Validators.required]],
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required],
      pais: ['', Validators.required]
      })
   }

    ngOnInit(): void {
      
      this.isLoggedIn = this.authService.isLoggedIn();
        if(this.isLoggedIn)
        {
          this.router.navigate(['/payment'])
        }else{
          this.redirectTo = this.router.url;
        }
    }
   
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.guestForm.reset(); // Resetear el formulario al ocultar
    }
  }
  
    goToLogin() : void {
      this.router.navigate(['/login'], { queryParams: { redirectTo: this.redirectTo } });
    }
  
  
  
    async onSubmit() {
  
      if(this.guestForm.valid){
        const client = {

          email: this.guestForm.value.email,
          nombre: this.guestForm.value.nombre,
          apellido: this.guestForm.value.apellido,
          dni: this.guestForm.value.dni,
          fechaNacimiento: this.guestForm.value.fechaNacimiento,
          codigoArea: this.guestForm.value.codigoArea,
          telefono: this.guestForm.value.telefono,
          direccion: this.guestForm.value.direccion,
          altura: this.guestForm.value.altura,
          piso: this.guestForm.value.piso,
          codigoPostal: this.guestForm.value.codigoPostal,
          ciudad: this.guestForm.value.ciudad,
          provincia: this.guestForm.value.provincia,
          pais: this.guestForm.value.pais
        }

        const response = await this.clientService.createClient(client);
        if (response && response.id) {
         
          localStorage.setItem('clientId', response.id);
        } else {
          console.error('Error: La respuesta del servicio no contiene id');
        }
        this.router.navigate(['/payment']);
      }
    }  
}