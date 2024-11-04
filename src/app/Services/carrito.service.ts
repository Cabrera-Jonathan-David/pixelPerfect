
import { Injectable } from '@angular/core';
import { CartItem } from '../Interface/cartitem'; // Asegúrate de que la ruta sea correcta
import { Product } from '../Interface/products'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  cartItems: CartItem[] = []; // Tu array de items en el carrito

  addProductToCart(product: Product): void {
    
    const existingItem = this.getCartItem(product.id.toString());

    if (existingItem) {
      existingItem.quantity++; // Incrementa la cantidad si el producto ya está en el carrito
    } else {
      this.cartItems.push({ product, quantity: 1 }); // Añade el nuevo producto al carrito
    }

    console.log(this.cartItems); // Verifica el estado del carrito
  }

  getCartItem(id: string): CartItem | undefined {
    return this.cartItems.find(item => item.product.id === id);
  }

  // Otros métodos como getCartItems, removeItem, etc.
}
