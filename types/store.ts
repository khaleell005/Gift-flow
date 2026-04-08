export type Role = 'customer' | 'admin' | 'staff';

export type Product = {
  id: string;
  name: string;
  category: 'Home' | 'Fashion' | 'Beauty' | 'Electronics';
  price: number;
  stock: number;
  image: string;
  description: string;
};

export type PackagingOption = {
  id: string;
  name: string;
  description: string;
  price: number;
  active: boolean;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type GiftOptions = {
  isGift: boolean;
  recipientName: string;
  note: string;
  packagingId: string;
};

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered';

export type Order = {
  id: string;
  customerName: string;
  assignedTo?: string;
  status: OrderStatus;
  createdAt: string;
  items: Array<{ productName: string; quantity: number }>;
  giftOptions: GiftOptions;
};
