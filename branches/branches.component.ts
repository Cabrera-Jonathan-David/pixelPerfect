import { Component } from '@angular/core';

interface Sucursal {
  nombre: string;
  direccion: string;
  telefono: string;
  imagenUrl: string;
}

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css'],
})
export class BranchesComponent {
  sucursales: Sucursal[] = [
    {
      nombre: 'Pixel Perfect Central',
      direccion: 'Avenida Siempre Viva 123, Ciudad Ficticia',
      telefono: '(555) 123-4567',
      imagenUrl: '/src/assets/imagenes/sucursal1.png',
    },
    {
      nombre: 'Pixel Perfect Sur',
      direccion: 'Calle Falsa 456, Ciudad Imaginaria',
      telefono: '(555) 234-5678',
      imagenUrl: 'assets/imagenes/sucursal2.jpg',
    },
    {
      nombre: 'Pixel Perfect Norte',
      direccion: 'Calle del Comercio 789, Barrio Norte',
      telefono: '(555) 345-6789',
      imagenUrl: 'assets/imagenes/sucursal3.jpg',
    },
    {
      nombre: 'Pixel Perfect Oeste',
      direccion: 'Avenida Las Palmas 101, Zona Oeste',
      telefono: '(555) 456-7890',
      imagenUrl: 'assets/imagenes/sucursal4.jpg',
    },
  ];
}
