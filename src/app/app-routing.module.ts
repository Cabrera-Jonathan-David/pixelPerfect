import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/login.component';
import { RegisterComponent } from './Components/Register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { ModifyUserComponent } from './Components/modify-user/modify-user.component';
import { ProductComponent } from './Components/product/product.component';
import { FormularioTarjetaComponent } from './Components/formulario-tarjeta/formulario-tarjeta.component';

const routes: Routes = [
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
{path: 'home', component: HomeComponent},
{path: 'modify-user', component: ModifyUserComponent},
{path: 'producto', component: ProductComponent},
{path: 'payment', component: FormularioTarjetaComponent},
{path: '', redirectTo: '/home', pathMatch: 'full'},  
{path: '**', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
