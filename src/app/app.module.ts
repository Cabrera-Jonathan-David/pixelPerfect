import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http'; 
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LoginComponent } from './Components/Login/login.component';
import { RegisterComponent } from './Components/Register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { ModifyUserComponent } from './Components/modify-user/modify-user.component';
import { ProductComponent } from './Components/product/product.component';

import { formularioTarjetaComponent } from './Components/formulario-tarjeta/formulario-tarjeta.component';
import { PrePaymentComponent } from './Components/pre-payment/pre-payment.component';



@NgModule({
  declarations: 
  [
    AppComponent,
    NavbarComponent,  
    LoginComponent,   
    RegisterComponent,
    HomeComponent,
    ModifyUserComponent, 

    ProductComponent, 
    FormularioTarjetaComponent
=======
    ProductComponent,
    PrePaymentComponent 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,       
    HttpClientModule,
    ReactiveFormsModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
