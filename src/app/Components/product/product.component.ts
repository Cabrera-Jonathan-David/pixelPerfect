import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() producto: any;

  constructor(private router: Router) {}

  verDetalle(id: number) {
    this.router.navigate(['/product', id]);
  }
}
