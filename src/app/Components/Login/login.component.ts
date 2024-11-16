import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../Services/authentication.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError: boolean = false;
  redirectUrl: string | null = null;


  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) { 
      this.loginForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      })

    }

  ngOnInit(): void {
    const url = this.activatedRoute.snapshot.queryParams['redirectTo'] || '/';
    this.redirectUrl = url;
  }

  goBack(): void {
    this.location.back();
  }

  async onSubmit(){

    if(this.loginForm.valid){
      const{username, password} = this.loginForm.value;
        try{
            const token = await this.authService.authenticateUser(username, password);
            if(token){
              localStorage.setItem('token', token)
              this.authService.setAuthenticated();
              this.loginError = false;
              
              if (this.redirectUrl) {
                this.router.navigateByUrl(this.redirectUrl);
              } else {
                this.router.navigate(['/home']);
              }
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
