export type BillingAddress = {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type PaymentSummary = {
  last4: number;
  brand: string;
  expMonth: number;
  expYear: number;
};

export type OrderItem = {
  productId: number;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  buyerId: string;
  orderDate: string;
  billingAddress: BillingAddress;
  paymentSummary: PaymentSummary;
  deliveryFee: number;
  subtotal: number;
  total: number;
  orderStatus: string;
  orderItems: OrderItem[];
};

export type CreateOrder = {
  billingAddress: BillingAddress;
  paymentSummary: PaymentSummary;
};

export type OrderParams = {
  cursor?: string | null;
  pageSize?: number;
  filter?: string;
  startDate?: string;
};
