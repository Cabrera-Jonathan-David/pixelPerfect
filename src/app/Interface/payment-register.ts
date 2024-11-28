export interface PaymentProduct {
    productId: string;
    price: number;
    quantity: number;
  }
  
export interface PaymentRegister {
  id: string;
  products: PaymentProduct[];
  userId: string | null;
  estado: string; 
}
