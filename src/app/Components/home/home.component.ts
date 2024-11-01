import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Interface/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productosDestacados: Product[] = []; // Arreglo para los productos destacados
  product: Product | null = null; // Asegúrate de definir la propiedad 'product'

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadFeaturedProducts(); // Cargar los productos destacados al iniciar
  }

  loadFeaturedProducts(): void {
    this.productService.getProducts().subscribe(
      (products) => {
        this.productosDestacados = products; // Asignar productos a la variable
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  // Agrega otros métodos si es necesario, por ejemplo, para seleccionar un producto
  selectProduct(product: Product): void {
    this.product = product; // Asignar el producto seleccionado
  }
}
