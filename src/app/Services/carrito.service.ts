import { Injectable } from '@angular/core';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private items: CartItem[] = [];

  // Agrega un producto al carrito
  addToCart(producto: CartItem) {
    const existingItem = this.items.find((item) => item.id === producto.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...producto, quantity: 1 });
    }
  }

  getItems() {
    return this.items;
  }
}
