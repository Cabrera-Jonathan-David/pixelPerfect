import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentRegister } from '../Interface/payment-register';

@Injectable({
  providedIn: 'root'
})
export class PaymentHistoryService {
  private apiUrl = 'http://localhost:3004/payment-history'; // URL para el registro de pagos

  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo pago
  registrarPago(paymentData: PaymentRegister): Observable<any> {
    return this.http.post<any>(this.apiUrl, paymentData);
  }

  // Método para obtener todos los registros de pagos
  obtenerPagos(): Observable<PaymentRegister[]> {
    return this.http.get<PaymentRegister[]>(this.apiUrl);
  }

  // Método para obtener un solo registro de pago por ID
  obtenerPagoPorId(id: number): Observable<PaymentRegister> {
    return this.http.get<PaymentRegister>(`${this.apiUrl}/${id}`);
  }

  // modifica un pedido
  updatePayment(id: number, updatedSale: PaymentRegister): Observable<void>{
    return this.http.patch<void>(`${this.apiUrl}/${id}`, { estado: updatedSale.estado } );
  }

}
