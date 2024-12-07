export interface PaymentProduct {
  productId: string;
  price: number;
  quantity: number;
}

export interface PaymentRegister {
id: string;
date?: Date;
products: PaymentProduct[];
userId: string | null;
estado: string;
amount?: number; 
}
