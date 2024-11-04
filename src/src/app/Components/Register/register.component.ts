import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../Services/client.service';
import { UserService } from '../../Services/user.service';
import { mayorDeEdadValidator } from '../../Validators/edad.validator';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ValidationService } from '../../Services/validation.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  usernameError: string | null = null;
  emailError: string | null = null;
  dniError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private userService: UserService,
    private router: Router,
    private http: HttpClient,
    private validationService: ValidationService
  ){
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9_]*$/)], [this.validationService.checkUsernameExistsAsync()]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], [this.validationService.checkEmailExistsAsync()]],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)], [this.validationService.checkDniExistsAsync()]],
      fechaNacimiento: ['', [Validators.required, mayorDeEdadValidator()]],
      codigoArea: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      direccion: ['', Validators.required],
      altura: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      piso: [''],
      codigoPostal: ['', [Validators.required]],
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required],
      pais: ['Argentina', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  //VALIDAMOS EL PASSWORD
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { passwordMismatch: true };
  }



  async registerUser() {
      if (this.registerForm.valid) {
        const clienteData = this.registerForm.value;
        delete clienteData.confirmPassword; 
  
        try {
          const cliente = await this.clientService.createClient(clienteData);
          
          const userData = {
            username: clienteData.username,
            password: clienteData.password,
            id_cliente: cliente.id
          };

          await this.userService.createUser(userData);
          alert('Usuario registrado con exito.');
          this.router.navigate(['/login']);

        } catch (error) {
          console.error('Error registrando usuario:', error);
        }
      }
   
  }



}