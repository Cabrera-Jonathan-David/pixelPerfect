import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Interface/products';
import { CarritoService } from '../../Services/carrito.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CarritoService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  addToCart(product: Product): void {
    if (product && product.id) {
      const existingItem = this.cartService.getCartItem(product.id); // Obtiene el item existente

      const availableStock = Number(product.stock); // Stock debe ser un número
      const existingQuantity = existingItem ? existingItem.quantity : 0; // Asegúrate de que esto sea un número

      // Comparar cantidades
      if (!existingItem || existingQuantity < availableStock) {
        this.cartService.addProductToCart(product);
        alert('Producto agregado al carrito!');
      } else {
        alert('No hay suficiente stock para agregar más unidades de este producto.');
      }
    } else {
      console.error('El producto no está disponible o no tiene un ID válido.');
    }
  }
  
}

