import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Interface/products';
import { CarritoService } from '../../Services/carrito.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchQuery: string = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CarritoService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['query'] || '';
      this.fetchProducts();
    });
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.filterProducts();
    });
  }

  filterProducts(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase() === query
    );
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
        alert('Producto agregado al carrito!');
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