import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/login.component';
import { RegisterComponent } from './Components/Register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { ModifyUserComponent } from './Components/modify-user/modify-user.component';
import { ProductComponent } from './Components/product/product.component';
import { DetalleProductoComponent } from './Components/detalle-producto/detalle-producto.component';
import { CarritoComponent } from './Components/carrito/carrito.component';
import { FormularioTarjetaComponent } from './Components/formulario-tarjeta/formulario-tarjeta.component';
import { PrePaymentComponent } from './Components/pre-payment/pre-payment.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'modify-user', component: ModifyUserComponent },
  { path: 'producto', component: ProductComponent },
  { path: 'product/:id', component: DetalleProductoComponent }, 
  { path: 'carrito', component: CarritoComponent },
  { path: 'payment', component: FormularioTarjetaComponent },
  { path: 'prepayment', component: PrePaymentComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
