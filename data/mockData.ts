import { Order, PackagingOption, Product } from '@/types/store';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Aroma Candle Set',
    category: 'Home',
    price: 28,
    stock: 24,
    image: '🕯️',
    description: 'Set of 3 calming candles with long burn time.'
  },
  {
    id: 'p2',
    name: 'Silk Scarf',
    category: 'Fashion',
    price: 45,
    stock: 15,
    image: '🧣',
    description: 'Lightweight silk scarf in premium gift box.'
  },
  {
    id: 'p3',
    name: 'Skin Glow Kit',
    category: 'Beauty',
    price: 62,
    stock: 12,
    image: '🧴',
    description: 'Skincare essentials with natural ingredients.'
  },
  {
    id: 'p4',
    name: 'Portable Speaker',
    category: 'Electronics',
    price: 79,
    stock: 8,
    image: '🔊',
    description: 'Compact Bluetooth speaker with deep bass.'
  }
];

export const packagingOptions: PackagingOption[] = [
  {
    id: 'pk1',
    name: 'Classic Wrap',
    description: 'Premium kraft paper with ribbon.',
    price: 6,
    active: true
  },
  {
    id: 'pk2',
    name: 'Luxury Box',
    description: 'Rigid gift box and satin finish.',
    price: 12,
    active: true
  },
  {
    id: 'pk3',
    name: 'Seasonal Theme',
    description: 'Festive themed wraps and decor.',
    price: 9,
    active: true
  }
];

export const initialOrders: Order[] = [
  {
    id: 'SF-1042',
    customerName: 'Maya Brooks',
    assignedTo: 'Alex (Staff)',
    status: 'Processing',
    createdAt: '2026-02-10',
    items: [{ productName: 'Aroma Candle Set', quantity: 1 }],
    giftOptions: {
      isGift: true,
      recipientName: 'Lena Brooks',
      note: 'Happy Birthday! Hope you enjoy these.',
      packagingId: 'pk2'
    }
  },
  {
    id: 'SF-1045',
    customerName: 'Paul Tan',
    assignedTo: 'Alex (Staff)',
    status: 'Shipped',
    createdAt: '2026-02-11',
    items: [{ productName: 'Portable Speaker', quantity: 1 }],
    giftOptions: {
      isGift: false,
      recipientName: '',
      note: '',
      packagingId: ''
    }
  }
];
