import { Component, OnInit } from '@angular/core';
import { PaymentRegister } from '../../Interface/payment-register';
import { PaymentHistoryService } from '../../Services/payment-history-service.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { User } from '../../Interface/user';
import { UserService } from '../../Services/user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrl: './purchase-history.component.css'
})
export class PurchaseHistoryComponent implements OnInit {

  purchaseList: PaymentRegister[] = [];

  constructor(
    private paymentHistoryService: PaymentHistoryService,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  loadPurchaseHistory(clientId: string) {
    this.paymentHistoryService.obtenerComprasCliente(clientId).subscribe(
      (data: PaymentRegister[]) => {
        this.purchaseList = data;
      },
      (error) => {
        console.error('Error al cargar el historial de compras', error);
      }
    );
  }

  async ngOnInit(): Promise<void> {
    try {
      const userId = await this.authService.getUserIdFromToken();
      console.log('UserId desde el token:', userId); // Verifica si el userId es correcto
      if (userId) {
        const user = await this.userService.getUserById(userId);
        console.log('Usuario obtenido:', user); // Verifica que el usuario se haya obtenido correctamente
        if (user && user.id_cliente) {
          this.loadPurchaseHistory(user.id_cliente); // Usamos id_cliente como clientId
        } else {
          console.error('No se encontró el id_cliente asociado al usuario');
        }
      } else {
        console.error('No se encontró el userId en el token');
      }
    } catch (error) {
      console.error('Error en ngOnInit:', error); // Muestra detalles sobre el error
    }
  }
  
}
