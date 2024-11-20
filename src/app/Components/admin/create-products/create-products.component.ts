import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../Services/product.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrl: './create-products.component.css'
})
export class CreateProductsComponent implements OnInit {
  productForm: FormGroup;


  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      stock: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image_url: ['', [Validators.required, Validators.pattern('https?://.+')]],
    });
  }

  
  ngOnInit(): void {
    
  }

  onSubmit():void {
    if(this.productForm.valid){
      this.productService.addProduct(this.productForm.value).subscribe(
        () => {
          alert("¡Producto Ingresado con éxito!");
          this.router.navigate(['/admin/list-products']);
        }
      )
    }
  }
}
