import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Product} from '../../../Interface/products';
import { ProductService } from '../../../Services/product.service'; 
import { Router } from '@angular/router';




@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})

export class ListProductsComponent implements OnInit {
  
  

  productsList: Product[] = [];

  constructor(private productService: ProductService, private router: Router) { }


  ngOnInit(): void {
    this.loadProducts();
  }  

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        console.log(data);
        this.productsList = data,
        (error: Product[]) => console.error('error inesperadamente esperado...', error);
      });
  }

  deleteProduct(id: string){
    if(confirm("are ya shure buddy?!")){
      this.productService.deleteProduct(id).subscribe(
        () => {
          this.productsList = this.productsList.filter(prod => prod.id !== id);
        },
        (error: Product[]) => console.error('Error al eliminar el producto', error)
      );
    }
  }

  updateProduct(id: string){
    this.router.navigate([`admin/update-products/${id}`]);
  }






}
