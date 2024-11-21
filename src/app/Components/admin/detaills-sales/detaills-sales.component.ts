import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../Services/product.service';
import { PaymentHistoryService } from '../../../Services/payment-history-service.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../Interface/products';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

export interface SaleProduct {
  productId:    string;
  productName:  string;
  price:        number;
  quantity:     number;
}


@Component({
  selector: 'app-detaills-sales',
  templateUrl: './detaills-sales.component.html',
  styleUrl: './detaills-sales.component.css'
})
export class DetaillsSalesComponent implements OnInit{

  saleProdsList: SaleProduct[] = [];
  saleId: number | null = null;

  constructor(private paymentHistoryService: PaymentHistoryService,
              private productService: ProductService,
              private route: ActivatedRoute
  ){}

  getName(id: string): Promise<string | null> {
    return this.productService.getProductById(id).toPromise()
    .then((product) => {
      if(product){
        return product.name;
      }
      else {
        return null;
      }
    });
  }


  loadDetaills(){
    // para que no tire errores con nulo, le pongo esta verificación
    if(this.saleId){
      this.paymentHistoryService.obtenerPagoPorId(this.saleId).subscribe(
        async (response) => {

          // POR LAS DUDAS vacío la lista
          this.saleProdsList = [];

          // uso el for of para esperar a las promises
          for(const prod of response.products){
            // cargo manualmente el nombre POR LAS DUDAS
            const prodName = await this.getName(prod.productId);

            // hago el push
            this.saleProdsList.push({
              productId: prod.productId,
              productName: prodName || '',
              price: prod.price,
              quantity: prod.quantity
            });
          }
        }
      )
    }
  }



  ngOnInit(): void {

    // cargo el id de la ruta en una variable
    const id = this.route.snapshot.paramMap.get('id');

    // verifico que la variable no sea nula (o distinta de number) y se la cargo
    this.saleId = id !== null ? Number(id) : null;

    // verifico que saleId no sea nulo
    if(this.saleId && !isNaN(this.saleId)){
      this.loadDetaills();
    }
    else {
      console.error('Ha ocurrido un error inesperado!');
    }



  }
}
