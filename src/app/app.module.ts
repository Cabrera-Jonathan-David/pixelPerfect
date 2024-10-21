import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';  // Importa FormsModule para ngModel
import { HttpClientModule } from '@angular/common/http'; // Si estás haciendo peticiones HTTP
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LoginComponent } from './Components/Login/login.component';
import { RegisterComponent } from './Components/Register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,  // Declaración del Navbar
    LoginComponent,   // Declaración del componente de Login
    RegisterComponent // Declaración del componente de Registro
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,       
    HttpClientModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
