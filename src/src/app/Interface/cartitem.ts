import { Product } from './products'; // Asegúrate de que la ruta sea correcta

export interface CartItem {
  product: Product; // El producto en el carrito
  quantity: number; // La cantidad del producto
}