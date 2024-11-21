import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Interface/products';
import { CarritoService } from '../../Services/carrito.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [
    'Laptops', 'Perifericos', 'Teclados', 'Monitores', 'Componentes', 
    'Almacenamiento', 'Accesorios', 'Muebles', 'Redes', 'Camaras'
  ];

  category: string = ''; 

  constructor(private productService: ProductService,
              private cartService: CarritoService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.loadProductsByCategory();
    });
  }

  loadProductsByCategory(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products.filter(product => product.category === this.category); 
    });
  }

  addToCart(product: Product): void {
    if (product && product.id) {
      const existingItem = this.cartService.getCartItem(product.id); 
      const availableStock = Number(product.stock); 
      if (availableStock <= 0) {
        alert('El producto no tiene stock disponible.');
        return;
      }
      const existingQuantity = existingItem ? existingItem.quantity : 0; 
      
      
      if (!existingItem || existingQuantity < availableStock) {
        this.cartService.addProductToCart(product);
      } else {
        alert(
          'No hay suficiente stock para agregar más unidades de este producto.'
        );
      }
    } else {
      console.error('El producto no está disponible o no tiene un ID válido.');
    }
  }

  
}