import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
              private router: Router,
              private cdr: ChangeDetectorRef
  ){}

  

  loadSales(){
    this.paymentHistoryService.obtenerPagos().subscribe(
      (data: PaymentRegister[]) => {

        console.log("data:", data)

        /// si existe algún estado que no sea válido, se vuelve automáticamente pendiente
        this.salesList = data.map(sale => {
          if (!['pendiente', 'confirmado', 'enviado'].includes(sale.estado)) {
            sale.estado = 'pendiente';
          }
          return sale;
        });


        const controls = this.salesList.reduce(
          (acc, sale) => {
            acc[sale.id] = new FormControl(sale.estado); // Sincronizar estado inicial
            return acc;
          },
          {} as Record<string, FormControl>
        );
  
        this.salesForm = this.fb.group(controls);
      }
    );
  }


  /* acomoda las opciones dependiendo de cuál está seleccionada, 
  para evitar que pase de confirmado a enviado
  */
  getStatus(sale: PaymentRegister): string[] {
    switch (sale.estado) {
      case 'pendiente':
        return ['pendiente', 'confirmado'];
      case 'confirmado':
        return ['pendiente', 'confirmado', 'enviado'];
      case 'enviado':
        return ['enviado'];
      default:
        return ['pendiente', 'confirmado'];
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
