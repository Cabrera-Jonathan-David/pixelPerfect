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
export class ProductComponent implements OnInit { 
  product$!: Observable<Product>; // Declara una propiedad para almacenar el producto

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void { // El método que se ejecuta al inicializar el componente
    this.loadProduct(); // Llama al método para cargar el producto
  }

  loadProduct(): void {
    const productId = '1'; // ID del producto que quieres obtener
    this.product$ = this.productService.getProductById(productId); // Asigna directamente el Observable
  }
}




