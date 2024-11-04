import { Component } from '@angular/core';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent {
  cartItems: CartItem[] = [
    // Ejemplo de datos para prueba
    {
      id: 1,
      name: 'Teclado mecánico',
      price: 120,
      quantity: 1,
      image: 'ruta/a/imagen.jpg',
    },
  ];

  increaseQuantity(item: CartItem) {
    item.quantity++;
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(item: CartItem) {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem !== item);
  }
}
