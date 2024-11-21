import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit{

    loginAdminForm: FormGroup;
    loginError: boolean = false;
 
  
  
    constructor(
      private fb: FormBuilder,
      private authService: AuthenticationService,
      private router: Router
  
    ) { 
        this.loginAdminForm = this.fb.group({
          username: ['', [Validators.required]],
          password: ['', [Validators.required]]
        })
  
      }
  
    ngOnInit(): void {
      localStorage.removeItem('token');

    }
  
  
    async onSubmit(){
  
      if(this.loginAdminForm.valid){
        const{username, password} = this.loginAdminForm.value;
          try{
              const token = await this.authService.authenticateAdmin(username, password);
              if(token){
                localStorage.setItem('token', token)
                this.authService.setAuthenticated();
                this.loginError = false;
                this.router.navigate(['/admin/list-sales']);

              }else{
                this.loginError = true;
                console.error('Credenciales Incorrectas')
              }
  
          }catch(error){
            console.error('Error al iniciar sesión:', error);
            this.loginError = true;
          }
      }
    }
  
  
  
  
  
    
  }
  


