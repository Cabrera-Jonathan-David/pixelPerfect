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
import { ListProductsComponent } from './Components/admin/list-products/list-products.component';
import { CreateProductsComponent } from './Components/admin/create-products/create-products.component';
import { UpdateProductsComponent } from './Components/admin/update-products/update-products.component';
import { FAQComponent } from './Components/faq/faq.component';


const routes: Routes = [

  // users paths

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
  { path: 'faq', component: FAQComponent},

  // admin paths

  { path: 'admin/create-products', component: CreateProductsComponent },
  { path: 'admin/list-products', component: ListProductsComponent },
  { path: 'admin/update-products/:id', component: UpdateProductsComponent },



  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
