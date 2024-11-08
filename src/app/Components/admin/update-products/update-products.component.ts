import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product} from '../../../Interface/products';
import { ProductService } from '../../../Services/product.service'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrl: './update-products.component.css'
})
export class UpdateProductsComponent implements OnInit{
  productForm: FormGroup;

  prodId: string | null = null;


  constructor(private fb: FormBuilder, private productService: ProductService,
              private route: ActivatedRoute, private router: Router)
  {
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
    this.prodId = this.route.snapshot.paramMap.get('id');


    if(this.prodId){
      this.productService.getProductById(this.prodId).subscribe(
        (product) => {
          this.productForm.patchValue(product);
        }
      )
    }
  }

  onSubmit(): void {
   if(this.productForm.valid && this.prodId !== null){
    const updatedProduct: Product = { id: this.prodId, ...this.productForm.value };

    this.productService.updateProduct(this.prodId, updatedProduct).subscribe(
      (response) => {
        console.log('¡Producto actualizado exitosamente!', response);
        this.router.navigate(['/list-products']);
      });
   }
  }

}
