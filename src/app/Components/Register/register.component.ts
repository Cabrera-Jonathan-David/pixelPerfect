import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { User } from '../../Interface/user';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent{

  constructor(private userService: UserService, private router: Router) {}
  
  // DEFINIMOS LOS CAMPOS DEL USUARIO
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

  //DEFININMOS LOS TEXTOS DE ERROR VACIOS
  public usernameError: string = '';
  public passwordError: string = '';
  public emailError: string = '';
  public nombreError: string = '';
  public apellidoError: string = '';
  public dniError: string = '';
  public fechaNacimientoError: string = '';
  public codigoAreaError: string = '';
  public telefonoError: string = '';
  public direccionError: string = '';
  public alturaError: string = '';
  public codigoPostalError: string = '';
  public ciudadError: string = '';
  public provinciaError: string = '';
  public paisError: string = '';

  //limpiamos los textos de error
  limpiarMensajeError(): void {
    this.usernameError = '';
    this.passwordError = '';
    this.emailError = '';
    this.nombreError = '';
    this.apellidoError = '';
    this.dniError = '';
    this.fechaNacimientoError = '';
    this.codigoAreaError = '';
    this.telefonoError = '';
    this.direccionError = '';
    this.alturaError = '';
    this.codigoPostalError = '';
    this.ciudadError = '';
    this.provinciaError = '';
    this.paisError = '';
  }

//funcion principal de register user

  async registerUser(confirmPasswordInput: HTMLInputElement): Promise<void> {

    this.limpiarMensajeError();

    const isUserNameValid = await this.validateUserName();
    const isEmailValid = this.validateEmail();
    const isPasswordValid = this.validatePassword(confirmPasswordInput);
    const isNombreValid = this.validateNombre();
    const isApellidoValid = this.validateApellido();
    const isDniValid = this.validateDni();
    const isFechaNacimientoValid = this.validateFechaNacimiento();
    const isCodigoValid = this.validateCodigoArea();
    const isTelefonoValid = this.validateTelefono();
    const isDireccionValid = this.validateDireccion();
    const isAlturaValid = this.validateAltura();
    const isCodigoPostalValid = this.validateCodigoPostal();
    const isCiudadValid = this.validateCiudad();
    const isProvinciaValid = this.validateProvincia();
    const isPaisValid = this.validatePais();
    
    if (!isUserNameValid ||!isEmailValid ||!isPasswordValid ||!isNombreValid ||!isApellidoValid ||!isDniValid ||
       !isFechaNacimientoValid ||!isCodigoValid ||!isTelefonoValid ||!isDireccionValid ||!isAlturaValid ||
       !isCodigoPostalValid ||!isCiudadValid ||!isProvinciaValid ||!isPaisValid) 
       {
        return;
       }
    


    const newUser: User = {
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

    try {
      const response = await this.userService.registerUser(newUser);
      console.log('Usuario registrado con éxito:', response);
      alert("Usuario registrado con éxito")
      this.limpiarFormulario(confirmPasswordInput);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      alert('Error al registrar el usuario. Intente de nuevo.');
    }



 
  }

  //validaciones-------------------------------------------------------------------
  
  async validateUserName(): Promise<boolean> {

    if(this.username == null){
      this.usernameError = 'Ingrese un nombre de usuario.';
      return false;
    }

    if(this.username.length < 5 || this.username.length > 20){
      this.usernameError = 'El nombre de usuario debe tener entre 5 y 20 caracteres.';
      return false;
    }
    
    const userNameRestriction = /^[a-zA-Z0-9_]+$/;
    if(!userNameRestriction.test(this.username)){
      this.usernameError = 'El nombre de usuario solo puede contener letras, números y guiones bajos.';
      return false;
    }

    if(this.username.includes(' ')){
      this.usernameError = 'El nombre de usuario no puede contener espacios.';
      return false;
    }

    if(this.username.trim() !== this.username){
      this.usernameError = 'El nombre de usuario no puede comenzar ni terminar con un espacio.';
      return false;
    }

    const exists = await this.userService.comprobarUserNameExiste(this.username).toPromise();
 
    if (exists !== undefined && exists.length > 0) {
      this.usernameError = 'El nombre de usuario ya existe.';
      return false;
    }

    return true;
  }

  validateEmail(): boolean {

    if(this.email == null){
      this.emailError = 'Ingrese un email.';
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailPattern.test(this.email)){
      this.emailError = 'Ingrese un email válido en el formato algo@dominio.com.';
      return false;
    }

    if(this.email.includes(' ')){
      this.emailError = 'El email no puede contener espacios.';
      return false;
    }

    return true;
  }

  validatePassword(confirmPasswordInput: HTMLInputElement): boolean {

    if(this.password == null){
      this.passwordError = 'Ingrese una contraseña.';
      return false;
    }

    if(this.password.length < 8){
      this.passwordError = 'La contraseña debe tener al menos 8 caracteres.';
      return false;
    }

    if (!/[A-Z]/.test(this.password)) {
      this.passwordError = 'La contraseña debe contener al menos una letra mayúscula.';
      return false;
    }

    if (!/[a-z]/.test(this.password)) {
      this.passwordError = 'La contraseña debe contener al menos una letra minúscula.';
      return false;
    }

    if (!/[0-9]/.test(this.password)) {
      this.passwordError = 'La contraseña debe contener al menos un número.';
      return false;
    }

    if (!/[@$!%*?&]/.test(this.password)) {
      this.passwordError = 'La contraseña debe contener al menos un carácter especial (@$!%*?&).';
      return false;
    }

    
    const confirmPassword = confirmPasswordInput.value;

    if (this.password !== confirmPassword) {
      this.passwordError = 'La contraseñas no coinciden.';
      return false;
    }


    return true;
  }

  validateNombre(): boolean {

    if (!this.nombre || this.nombre.trim().length === 0) {
      this.nombreError = 'El campo nombre es obligatorio.';
      return false;
    }

    if (this.nombre.length < 2) {
      this.nombreError = 'El nombre debe tener al menos 2 caracteres.';
      return false;
    }

    if (this.nombre.length > 50) {
      this.nombreError = 'El nombre no debe exceder los 50 caracteres.';
      return false;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.nombre)) {
      this.nombreError = 'El nombre solo debe contener letras y espacios.';
      return false;
    }

    return true;
  }

  validateApellido(): boolean {
    
    if (!this.apellido || this.apellido.trim().length === 0) {
      this.apellidoError = 'El campo apellido es obligatorio.';
      return false;
    }

    if (this.apellido.length < 2) {
      this.apellidoError = 'El apellido debe tener al menos 2 caracteres.';
      return false;
    }

    if (this.apellido.length > 50) {
      this.apellidoError = 'El apellido no debe exceder los 50 caracteres.';
      return false;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.apellido)) {
      this.apellidoError = 'El apellido solo debe contener letras y espacios.';
      return false;
    }
    
    return true;
  }

  validateDni(): boolean {

    if (!this.dni || this.dni.trim().length === 0) {
      this.dniError = 'El campo DNI es obligatorio.';
      return false;
    }

    if (!/^\d+$/.test(this.dni)) {
      this.dniError = 'El DNI solo debe contener números.';
      return false;
    }

    if (this.dni.length < 7 || this.dni.length > 8) {
      this.dniError = 'El DNI debe tener entre 7 y 8 dígitos.';
      return false;
    }

    return true;
  }

  validateFechaNacimiento(): boolean {

    if (!this.fechaNacimiento) {
      this.fechaNacimientoError = 'La fecha de nacimiento es obligatoria.';
      return false;
    }
  
    const fechaNacimientoDate = new Date(this.fechaNacimiento);
    const hoy = new Date();
  
    // Calcular la diferencia de años, meses y días
    const edadMinima = new Date(
      hoy.getFullYear() - 18, 
      hoy.getMonth(), 
      hoy.getDate()
    );
  
    // Verificar si la fecha de nacimiento es mayor a la fecha mínima de 18 años
    if (fechaNacimientoDate > edadMinima) {
      this.fechaNacimientoError = 'Debes tener al menos 18 años.';
      return false;
    }

    return true;
  }

  validateCodigoArea(): boolean {

    if (!this.codigoArea) {
      this.codigoAreaError = 'El código de área es obligatorio.';
      return false;
    }
  
    const codigoAreaRegex = /^\d+$/; // Solo dígitos
    if (!codigoAreaRegex.test(this.codigoArea)) {
      this.codigoAreaError = 'El código de área debe contener solo números.';
      return false;
    }
  
    if (this.codigoArea.length < 2 || this.codigoArea.length > 5) {
      this.codigoAreaError = 'El código de área debe tener entre 2 y 5 dígitos.';
      return false;
    }


    return true;
  }

  validateTelefono(): boolean {

    if (this.telefono === null || this.telefono === undefined) {
      this.telefonoError = 'El número de teléfono es obligatorio.';
      return false;
    }
  
    // Convertir el número de teléfono a string para validar su formato
    const telefonoString = this.telefono.toString();
  
    // Verificar si contiene solo números
    const soloNumeros = /^[0-9]+$/;
  
    if (!soloNumeros.test(telefonoString)) {
      this.telefonoError = 'El número de teléfono solo puede contener dígitos.';
      return false;
    }
  
    // Verificar la longitud del teléfono (9 a 11 dígitos)
    if (telefonoString.length < 9 || telefonoString.length > 11) {
      this.telefonoError = 'El número de teléfono debe tener entre 9 y 11 dígitos.';
      return false;
    }

    return true;
  }

  validateDireccion(): boolean{


  if (!this.direccion || this.direccion.trim() === '') {
    this.direccionError = 'La dirección es obligatoria.';
    return false;
  }

  const direccionRegex = /^[a-zA-Z0-9\s,.#-]+$/;
  if (!direccionRegex.test(this.direccion)) {
    this.direccionError = 'La dirección contiene caracteres no válidos.';
    return false;
  }

  if (this.direccion.length < 5 || this.direccion.length > 100) {
    this.direccionError = 'La dirección debe tener entre 5 y 100 caracteres.';
    return false;
  }

    return true;
  }

  validateAltura(): boolean{

    if (this.altura == null) {
      this.alturaError = 'La altura no puede estar vacía.';
      return false;
    }
  
    const alturaRestriction = /^[1-9]\d*$/; //verificamos que sea positivo
    if (!alturaRestriction.test(this.altura.toString())) {
      this.alturaError = 'La altura debe ser un número entero positivo.';
      return false;
    }

    return true;
  }

  validateCodigoPostal(): boolean{

    if (!this.codigoPostal) {
      this.codigoPostalError = 'El código postal no puede estar vacío.';
      return false;
    }
  
    const codigoPostalRestriction = /^\d{4,5}$/; 
    if (!codigoPostalRestriction.test(this.codigoPostal)) {
      this.codigoPostalError = 'El código postal debe tener 4 o 5 dígitos.';
      return false;
    }

    return true;
  }

  validateCiudad(): boolean{

    if (!this.ciudad) {
      this.ciudadError = 'El campo ciudad no puede estar vacío.';
      return false;
    }
  
    const ciudadRestriction = /^[A-Za-záéíóúÁÉÍÓÚÑñ\s]+$/; // Solo letras y espacios
    if (!ciudadRestriction.test(this.ciudad)) {
      this.ciudadError = 'La ciudad solo puede contener letras.';
      return false;
    }

    return true;
  }

  validateProvincia(): boolean{

    if (!this.provincia) {
      this.provinciaError = 'El campo provincia no puede estar vacío.';
      return false;
    }
  
    const provinciaRestriction = /^[A-Za-záéíóúÁÉÍÓÚÑñ\s]+$/; // Solo letras y espacios
    if (!provinciaRestriction.test(this.provincia)) {
      this.provinciaError = 'La provincia solo puede contener letras.';
      return false;
    }  

    return true;
  }

  validatePais(): boolean{

    if (!this.pais) {
      this.paisError = 'El campo país no puede estar vacío.';
      return false;
    }
  
    const paisRestriction = /^[A-Za-záéíóúÁÉÍÓÚÑñ\s]+$/; // Solo letras y espacios
    if (!paisRestriction.test(this.pais)) {
      this.paisError = 'El país solo puede contener letras.';
      return false;
    }

    return true;
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


}
