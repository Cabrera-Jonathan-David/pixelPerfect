
import { Injectable } from '@angular/core';
import { CartItem } from '../Interface/cartitem'; // Asegúrate de que la ruta sea correcta
import { Product } from '../Interface/products'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  cartItems: CartItem[] = []; 
  constructor() {
    this.loadCartItems(); // Carga los items del carrito desde localStorage al inicializar el servicio
  }

  private loadCartItems(): void {
    const storedCartItems = localStorage.getItem('cartItems'); // Obtiene los items guardados en localStorage
    this.cartItems = storedCartItems ? JSON.parse(storedCartItems) : []; // Si hay items, los parsea; si no, inicializa como arreglo vacío
  }


  addProductToCart(product: Product): void {

    if (!product.id) {
      console.error("El producto no tiene un ID válido.");
      return; 
    }      

    const existingItem = this.getCartItem(product.id.toString());
    
    if (existingItem) {
      
      existingItem.quantity++; // Incrementa la cantidad si el producto ya está en el carrito
    } else {
      
      this.cartItems.push({ product, quantity: 1 }); // Añade el nuevo producto al carrito
    }
this.saveCartItems();
    console.log(this.cartItems); // Verifica el estado del carrito
  }

  getCartItem(id: string): CartItem | undefined {
    return this.cartItems.find(item => item.product.id === id);
  }

  public saveCartItems(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems)); // Guarda el carrito como un string en localStorage
  }

  removeItem(item: CartItem): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item); // Filtra el item a eliminar
    this.saveCartItems(); 
  }

  // Otros métodos como getCartItems, removeItem, etc.
}
