import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarjetaService } from '../../Services/tarjeta.service';
import { CartItem } from '../../Interface/cartitem';
import { PaymentHistoryService } from '../../Services/payment-history-service.service';
import { ProductService } from '../../Services/product.service';
import { PaymentRegister } from '../../Interface/payment-register';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service'; 

@Component({
  selector: 'app-formulario-tarjeta',
  templateUrl: './formulario-tarjeta.component.html',
  styleUrls: ['./formulario-tarjeta.component.css']
})
export class FormularioTarjetaComponent {
  tarjetaForm: FormGroup;
  mensajeExito: string = '';
  showModal: boolean = false; 
  cartItems: CartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
  userId: string | null = ''; 

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tarjetaService: TarjetaService,
    private paymentHistoryService: PaymentHistoryService,
    private productService: ProductService,
    private userService: UserService 
  ) {
    this.tarjetaForm = this.fb.group({
      nombreTitular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      fechaExpiracion: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    });

    // Obtener userId dede el token
    this.userId = this.userService.getClientIdFromToken();
  }

  async enviarFormulario() {
    if (this.tarjetaForm.valid) {
      try {
        const tarjetaValida = await this.tarjetaService.validarTarjeta(this.tarjetaForm.value).toPromise();
        if (tarjetaValida && tarjetaValida.length > 0) {
          const stockValido = await this.verificarStock();
          if (stockValido) {
            await this.registrarPago();
            this.mensajeExito = 'Pago realizado con éxito';
            localStorage.removeItem('cartItems'); 
            this.showModal = true;
          } else {
            this.mensajeExito = 'Algunos productos no tienen stock suficiente';
          }
        } else {
          this.mensajeExito = 'Datos de la tarjeta inválidos';
        }
      } catch (error) {
        console.error('Error al procesar el pago:', error);
        this.mensajeExito = 'Error al procesar el pago';
      }
    } else {
      this.mensajeExito = 'Formulario inválido';
    }
  }

  private async verificarStock(): Promise<boolean> {
    const stockChecks = this.cartItems.map(cartItem => 
      this.productService.getProductById(cartItem.product.id!).toPromise()
    );
    const stockResults = await Promise.all(stockChecks);
    return stockResults.every((producto, i) => 
      producto && parseInt(producto.stock, 10) >= this.cartItems[i].quantity
    );
  }



  private async registrarPago() {
    const paymentData: PaymentRegister = {
      id: Date.now(), 
      products: this.cartItems.map(cartItem => ({
        productId: cartItem.product.id!,
        price: cartItem.product.price,
        quantity: cartItem.quantity
      })),
      userId: this.userId!, // Utilizamos el userId en formato original
      estado: 'Pendiente'
    };

    // Enviar el objeto `PaymentRegister` al servicio
    await this.paymentHistoryService.registrarPago(paymentData).toPromise();
  }

  
  
  
  
  formatCardNumber(value: string): string {
    if (!value) return '';
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1-').trim().slice(0, -1);
  }


  updateCardDisplay() {
    this.tarjetaForm.get('numeroTarjeta')?.setValue(this.tarjetaForm.get('numeroTarjeta')?.value.replace(/-/g, ''));
  }


confirmarYRedirigir() {
  this.showModal = false;
  this.router.navigate(['/home']); 
}
}