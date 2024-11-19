
import { Injectable } from '@angular/core';
import { CartItem } from '../Interface/cartitem'; 
import { Product } from '../Interface/products'; 
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  cartItems: CartItem[] = []; 
  constructor() {
    this.loadCartItems(); 
  }

  // Observable que los componentes pueden suscribirse
  private reloadCarritoSubject = new Subject<void>();
  reloadCarrito$ = this.reloadCarritoSubject.asObservable();
  // Método para emitir el evento de recarga
  forceReloadCarrito(): void {
    this.clearCart();
    this.reloadCarritoSubject.next();
    
  }


  loadCartItems(): void {
    const storedCartItems = localStorage.getItem('cartItems'); 
    this.cartItems = storedCartItems ? JSON.parse(storedCartItems) : []; 
  }


  addProductToCart(product: Product): void {

    if (!product.id) {
      console.error("El producto no tiene un ID válido.");
      return; 
    }      

    const existingItem = this.getCartItem(product.id.toString());
    
    if (existingItem) {
      
      existingItem.quantity++; 
    } else {
      
      this.cartItems.push({ product, quantity: 1 }); 
    }
  
    this.saveCartItems();
    console.log(this.cartItems); 
  }

  getCartItem(id: string): CartItem | undefined {
    return this.cartItems.find(item => item.product.id === id);
  }

  public saveCartItems(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems)); 
  }

  removeItem(item: CartItem): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item); 
    this.saveCartItems(); 
  }


  clearCart(): void {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
  }

 
}
