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
import { AdminLoginComponent } from './Components/admin/admin-login/admin-login.component';
import { adminAuthGuard } from './auth/admin-auth.guard';
import { notAdminAuthGuard } from './auth/not-admin-auth.guard';
import { userAuthGuard } from './auth/user-auth.guard';
import { ListSalesComponent } from './Components/admin/list-sales/list-sales.component';
import { BranchesComponent } from './Components/branches/branches.component';
import { DetaillsSalesComponent } from './Components/admin/detaills-sales/detaills-sales.component';
import { CategoryComponent } from './Components/category/category.component';
const routes: Routes = [
  // users paths

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [notAdminAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [notAdminAuthGuard],
  },
  { path: 'home', component: HomeComponent, canActivate: [notAdminAuthGuard] },
  { path: '', component: HomeComponent, canActivate: [notAdminAuthGuard] },
  {
    path: 'modify-user',
    component: ModifyUserComponent,
    canActivate: [userAuthGuard],
  },
  {
    path: 'producto',
    component: ProductComponent,
    canActivate: [notAdminAuthGuard],
  },
  {
    path: 'category/:category', 
    component: CategoryComponent,
    canActivate: [notAdminAuthGuard],
  },
  {
    path: 'product/:id',
    component: DetalleProductoComponent,
    canActivate: [notAdminAuthGuard],
  },
  {
    path: 'carrito',
    component: CarritoComponent,
    canActivate: [notAdminAuthGuard],
  },
  {
    path: 'payment',
    component: FormularioTarjetaComponent,
    canActivate: [notAdminAuthGuard],
  },
  {
    path: 'prepayment',
    component: PrePaymentComponent,
    canActivate: [notAdminAuthGuard],
  },
  { path: 'faq', component: FAQComponent, canActivate: [notAdminAuthGuard] },
  { path: 'sucursales', component: BranchesComponent },

  // admin paths

  {
    path: 'admin/create-products',
    component: CreateProductsComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'admin/list-products',
    component: ListProductsComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'admin/update-products/:id',
    component: UpdateProductsComponent,
    canActivate: [adminAuthGuard],
  },
  { path: 'admin/list-sales',
    component: ListSalesComponent,
    canActivate: [adminAuthGuard]
  },
  {
    path: 'admin/details-sales/:id',
    component: DetaillsSalesComponent,
    canActivate: [adminAuthGuard]
  },



  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin/list-sales', component: ListSalesComponent },
  

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
