import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../Services/product.service';
import { PaymentHistoryService } from '../../../Services/payment-history-service.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../Interface/products';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { ClientService } from '../../../Services/client.service';
import { PaymentRegister } from '../../../Interface/payment-register';
import { Client } from '../../../Interface/client';

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
  

  saleClient: Client | null = null;

  constructor(private paymentHistoryService: PaymentHistoryService,
              private productService: ProductService,
              private clientService:  ClientService,
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


  loadDetaills(saleId: string){
    // para que no tire errores con nulo, le pongo esta verificación
    if(saleId){
      this.paymentHistoryService.obtenerPagoPorId(saleId).subscribe(
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

  loadClient(saleId: string){
    if(saleId){
      this.paymentHistoryService.obtenerPagoPorId(saleId).subscribe(
      (data: PaymentRegister) => {

        
        if(data.userId){
          this.clientService.getClientByIdConObservables(data.userId).subscribe(
            {
              next: (client: Client) => {
                console.log('cliente:', client );

                this.saleClient = client;
              }
            }
            
          )}
      });
    }
  }


  ngOnInit(): void {
    
    const saleId = this.route.snapshot.paramMap.get('id');

    // verifico que saleId no sea nulo
    if(saleId && saleId !== undefined){
      this.loadDetaills(saleId);
      this.loadClient(saleId);
    }
    else {
      console.error('Ha ocurrido un error inesperado!');
    }



  }
}
