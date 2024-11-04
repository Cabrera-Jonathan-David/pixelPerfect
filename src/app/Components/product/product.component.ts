import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../Interface/products';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'] // Corregido a styleUrls
})
export class ProductComponent { 
  product$!: Observable<Product>; // Declara una propiedad para almacenar el producto
  selectedProductId: string = '';
  constructor(private productService: ProductService, private router: Router) {}


  loadProduct(): void {
    
    this.product$ = this.productService.getProductById(this.selectedProductId); // Asigna directamente el Observable
  }
}




