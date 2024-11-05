import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Interface/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiProductUrl = 'http://localhost:3002/products';

  constructor(private http: HttpClient) {}

  // GET - Obtener todos los productos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiProductUrl);
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiProductUrl}/${productId}`); // Asegúrate de que esta URL sea correcta
  }
  // POST - Crear un nuevo producto
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiProductUrl, product);
  }

  // DELETE - Eliminar un producto por su ID
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiProductUrl}/${id}`);
  }
}
