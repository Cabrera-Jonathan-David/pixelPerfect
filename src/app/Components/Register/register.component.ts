import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { User } from '../../Interface/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  
  public username:        string = '';
  public password:        string = '';
  public email:           string = '';
  public nombre:          string = '';
  public apellido:        string = '';
  public dni:             string = '';
  public fechaNacimiento: string | null = null; 
  public codigoArea:      string = '';
  public telefono:        number | null = null;
  public direccion:       string = '';
  public altura:          number | null = null;
  public piso?:           string = ''; 
  public codigoPostal:    string = '';
  public ciudad:          string = '';
  public provincia:       string = '';
  public pais:            string = '';
  

  constructor(private userService: UserService) {}

  registerUser(confirmPasswordInput: HTMLInputElement): void {
    const confirmPassword = confirmPasswordInput.value;

    if (this.password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const newUser: User = {
      id: 0,
      username: this.username,
      password: this.password,
      email: this.email,
      nombre: this.nombre,
      apellido: this.apellido,
      dni: this.dni,
      fechaNacimiento: this.fechaNacimiento ? this.fechaNacimiento : null,
      codigoArea: this.codigoArea,
      telefono: this.telefono !== null ? this.telefono : 0,
      direccion: this.direccion,
      altura: this.altura !== null ? this.altura : 0,
      piso: this.piso,
      codigoPostal: this.codigoPostal,
      ciudad: this.ciudad,
      provincia: this.provincia,
      pais: this.pais
    };

    // Si el registro es exitoso, limpiar el formulario
    if (this.userService.registerUser(newUser)) {
      this.limpiarFormulario(confirmPasswordInput);
    }
  }

  limpiarFormulario(confirmPasswordInput: HTMLInputElement): void {
    this.username = '';
    this.password = '';
    confirmPasswordInput.value = ''; // Limpiar confirmPasswordInput también
    this.email = '';
    this.nombre = '';
    this.apellido = '';
    this.dni = '';
    this.fechaNacimiento = null;
    this.codigoArea = '';
    this.telefono = null;
    this.direccion = '';
    this.altura = null;
    this.piso = '';
    this.codigoPostal = '';
    this.ciudad = '';
    this.provincia = '';
    this.pais = '';
  }

  ngOnInit(): void {}
}
