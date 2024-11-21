import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../Services/carrito.service'; // Asegúrate de que la ruta sea correcta
import { CartItem } from '../../Interface/cartitem';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CarritoService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  
  loadCartItems(): void {
    this.cartItems = this.cartService.cartItems; 
  }

 
  increaseQuantity(item: CartItem): void {
    const availableStock = Number(item.product.stock);
    if (item.quantity < availableStock) {
      item.quantity++; 
      this.updateCartItem(item);
    } else {
      alert(
        'No se puede agregar más unidades. Stock disponible: ' + availableStock
      ); 
    }
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartItem(item);
    }
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item);
    this.loadCartItems();
  }

  onClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  private updateCartItem(item: CartItem): void {
    if (item.product && item.product.id) {
      const existingItem = this.cartService.getCartItem(
        item.product.id.toString()
      ); 
      if (existingItem) {
        existingItem.quantity = item.quantity;
        this.cartService.saveCartItems(); 
      }
    } else {
      console.error('El item no tiene un producto válido o no tiene ID.');
    }
  }
}
