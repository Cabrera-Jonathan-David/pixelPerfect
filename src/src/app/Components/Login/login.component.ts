import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthenticationService,
    private location: Location

  ) { 
      this.loginForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      })

    }

   
  

  ngOnInit(): void {
    
  }

  goBack(): void {
    this.location.back();
  }

  async onSubmit(){

    if(this.loginForm.valid){
      const{username, password} = this.loginForm.value;
        try{
            const token = await this.userService.login(username, password);
            if(token){
              localStorage.setItem('token', token)
              this.authService.login();
              this.loginError = false;
              /*this.router.navigate(['/home']);*/
              this.goBack();
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
