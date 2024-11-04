import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { CarritoService } from '../../Services/carrito.service';
import { Product } from '../../Interface/products'; // Ruta de importación actualizada

@Component({
  selector: 'app-detalle-producto', // Nombre del selector
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  product: Product | null = null; // El producto cargado desde la API

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CarritoService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  // Cargar el producto específico usando el ID de la ruta
  loadProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (product) => {
          this.product = product;
        },
        error: (err) => {
          console.error('Error al cargar el producto:', err);
        }
      });
    }
  }

  // Agregar al carrito verificando el stock
  addToCart(): void {
    if (this.product && this.product.id) { // Verifica que product y product.id no sean nulos
      const existingItem = this.cartService.getCartItem(this.product.id);
  
      // Asegúrate de convertir stock a número si es necesario
      const availableStock = Number(this.product.stock); // Convierte a número
      const existingQuantity = existingItem ? existingItem.quantity : 0; // Asegúrate de que existingQuantity sea un número
  
      if (!existingItem || existingQuantity < availableStock) {
        this.cartService.addProductToCart(this.product);
      } else {
        alert('No hay suficiente stock para agregar más unidades de este producto.');
      }
    } else {
      console.error('El producto no está disponible o no tiene un ID válido.');
    }
  }
  
  
}
