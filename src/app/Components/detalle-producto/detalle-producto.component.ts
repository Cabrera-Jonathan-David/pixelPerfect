import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { CarritoService } from '../../Services/carrito.service';
import { Product } from '../../Interface/products';

@Component({
  selector: 'app-detalle-producto', 
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  product: Product | null = null; // 

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CarritoService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
    console.log(this.cartService.cartItems); // Verifica el estado del carrito aquí
  
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
    if (this.product && this.product.id) { 
      console.log('Producto a agregar:', this.product); 
      const existingItem = this.cartService.getCartItem(this.product.id);
  
  
      const availableStock = Number(this.product.stock);
      if (availableStock <= 0) {
        alert('No hay stock disponible para este producto.'); 
        return; 
      }
      
      const existingQuantity = existingItem ? existingItem.quantity : 0; 
  
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
