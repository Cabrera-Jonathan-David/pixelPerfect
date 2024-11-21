import { Component, OnInit } from '@angular/core';
import { PaymentHistoryService } from '../../../Services/payment-history-service.service';
import { PaymentRegister } from '../../../Interface/payment-register';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-sales',
  templateUrl: './list-sales.component.html',
  styleUrl: './list-sales.component.css'
})
export class ListSalesComponent implements OnInit{
  salesForm: FormGroup = this.fb.group({});
  salesList: PaymentRegister [] = [];


  constructor(private paymentHistoryService: PaymentHistoryService,
              private fb: FormBuilder,
              private router: Router
  ){}

  

  loadSales(){
    this.paymentHistoryService.obtenerPagos().subscribe(
      (data: PaymentRegister[]) => {
        this.salesList = data
        this.salesForm = this.fb.group(
          data.reduce(
            (controls: Record<string, FormControl>, sale) => {
            controls[sale.id] = new FormControl(sale.estado);
            return controls;
            }, {})
        );
      })




  }


  /* acomoda las opciones dependiendo de cuál está seleccionada, 
  para evitar que pase de confirmado a enviado
  */
  getStatus(sale: PaymentRegister): string[] {
    if(sale.estado == 'pendiente'){
      return ['pediente', 'confirmado']
    }
    else if(sale.estado == 'confirmado'){
      return ['pendiente', 'confirmado', 'enviado']
    }
    else if(sale.estado == 'enviado'){
      return ['enviado']
    }
    else {
      sale.estado = 'pendiente';
      this.paymentHistoryService.updatePayment(sale.id, sale);
      return ['pendiente', 'confirmado', 'enviado']
    }
  }

  getControl(controlName: string): FormControl{
    return this.salesForm.get(controlName) as FormControl;
  }

  // si un pedido está enviado, no se puede cambiar su estado
  canChangeStatus(sale: PaymentRegister): boolean{
    return sale.estado !== 'enviado';
  }

  // es una petición que actualiza el estado cuando se selecciona
  changeStatus(sale: PaymentRegister){

    const control = this.salesForm.get(sale.id.toString())
    if(control){
      sale.estado = control.value;
    }

    this.paymentHistoryService.updatePayment(sale.id, sale).subscribe(
      (response) => {
        console.log('¡Estado actualizado exitosamente!', response);
      })
  }


  seeDetails(id: number){
    this.router.navigate([`admin/details-sales/${id}`]);
  }


  ngOnInit(): void {
    this.loadSales();
  }
}
