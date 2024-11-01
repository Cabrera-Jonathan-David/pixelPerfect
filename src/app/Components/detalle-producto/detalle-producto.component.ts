import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '../../Services/carrito.service'; // Asegúrate de que la ruta es correcta

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css'],
})
export class DetalleProductoComponent implements OnInit {
  producto: any;

  constructor(
    private route: ActivatedRoute,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.cargarProducto();
  }

  // Simula la carga del producto por ID; sustituir por lógica real
  cargarProducto() {
    const productId = this.route.snapshot.paramMap.get('id');

    // Aquí llamamos a una API o servicio que obtenga el producto específico
    // Suponiendo que ya tenemos una lista de productos, solo para el ejemplo:
    const productos = [
      {
        id: 1,
        name: 'Teclado mecánico',
        price: 120,
        image: 'ruta/a/imagen.jpg',
        description: 'Teclado mecánico retroiluminado.',
      },
      {
        id: 2,
        name: 'Mouse óptico',
        price: 50,
        image: 'ruta/a/imagen2.jpg',
        description: 'Mouse óptico de alta precisión.',
      },
      // Otros productos...
    ];

    // Buscar el producto según el ID
    this.producto = productos.find(
      (p) => p.id === parseInt(productId || '', 10)
    );
  }

  // Agrega el producto actual al carrito
  addToCart() {
    if (this.producto) {
      this.carritoService.addToCart({
        id: this.producto.id,
        name: this.producto.name,
        price: this.producto.price,
        image: this.producto.image,
        quantity: 1, // Empezamos con cantidad 1
      });
      alert('Producto agregado al carrito');
    }
  }
}
