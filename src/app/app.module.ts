import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import { HttpClientModule } from '@angular/common/http'; // Si estás haciendo peticiones HTTP
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LoginComponent } from './Components/Login/login.component';
import { RegisterComponent } from './Components/Register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { ModifyUserComponent } from './Components/modify-user/modify-user.component';
import { ProductComponent } from './Components/product/product.component';
import { CarritoComponent } from './Components/carrito/carrito.component';
import { DetalleProductoComponent } from './Components/detalle-producto/detalle-producto.component';
import { FormularioTarjetaComponent } from './Components/formulario-tarjeta/formulario-tarjeta.component';
import { PrePaymentComponent } from './Components/pre-payment/pre-payment.component';
import { CreateProductsComponent } from './Components/admin/create-products/create-products.component';
import { ListProductsComponent } from './Components/admin/list-products/list-products.component';
import { UpdateProductsComponent } from './Components/admin/update-products/update-products.component';
import { FAQComponent } from './Components/faq/faq.component';
import { AdminLoginComponent } from './Components/admin/admin-login/admin-login.component';
import { ListSalesComponent } from './Components/admin/list-sales/list-sales.component';
import { BranchesComponent } from './Components/branches/branches.component';
import { DetaillsSalesComponent } from './Components/admin/detaills-sales/detaills-sales.component';
import { CategoryComponent } from './Components/category/category.component';
import { SearchResultsComponent } from './Components/search-results/search-results.component';
import { PurchaseHistoryComponent } from './Components/purchase-history/purchase-history.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ModifyUserComponent,
    ProductComponent,
    CarritoComponent,
    DetalleProductoComponent,
    FormularioTarjetaComponent,
    PrePaymentComponent,
    CreateProductsComponent,
    ListProductsComponent,
    UpdateProductsComponent,
    FAQComponent,
    AdminLoginComponent,
    ListSalesComponent,
    BranchesComponent,
    DetaillsSalesComponent,
    CategoryComponent,
    SearchResultsComponent,
    PurchaseHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
