'use client';

import { useMemo, useState } from 'react';
import { initialOrders, packagingOptions, products } from '@/data/mockData';
import { CartItem, GiftOptions, Order, OrderStatus, Product, Role } from '@/types/store';

const GIFT_NOTE_FEE = 4;
const SHIPPING_FEE = 8;

export default function HomePage() {
  const [role, setRole] = useState<Role>('customer');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [giftOptions, setGiftOptions] = useState<GiftOptions>({
    isGift: false,
    recipientName: '',
    note: '',
    packagingId: ''
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const bySearch = product.name.toLowerCase().includes(search.toLowerCase());
      const byCategory = category === 'All' || product.category === category;
      return bySearch && byCategory;
    });
  }, [search, category]);

  const cartProducts = useMemo(() => {
    return cart
      .map((item) => {
        const product = products.find((candidate) => candidate.id === item.productId);
        if (!product) return null;
        return { product, quantity: item.quantity };
      })
      .filter(Boolean) as Array<{ product: Product; quantity: number }>;
  }, [cart]);

  const subtotal = cartProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const packagingPrice =
    giftOptions.isGift && giftOptions.packagingId
      ? packagingOptions.find((pack) => pack.id === giftOptions.packagingId)?.price ?? 0
      : 0;
  const notePrice = giftOptions.isGift && giftOptions.note.trim() ? GIFT_NOTE_FEE : 0;
  const total = subtotal + packagingPrice + notePrice + (cartProducts.length ? SHIPPING_FEE : 0);

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((current) => current.map((order) => (order.id === id ? { ...order, status } : order)));
  };

  const addToCart = (productId: string) => {
    setCart((current) => {
      const exists = current.find((item) => item.productId === productId);
      if (exists) {
        return current.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { productId, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((current) => current.filter((item) => item.productId !== productId));
      return;
    }
    setCart((current) =>
      current.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    );
  };

  const placeOrder = () => {
    if (!cartProducts.length) return;
    const newOrder: Order = {
      id: `SF-${1000 + orders.length + 1}`,
      customerName: 'Current Customer',
      assignedTo: 'Alex (Staff)',
      status: 'Pending',
      createdAt: new Date().toISOString().slice(0, 10),
      items: cartProducts.map((item) => ({ productName: item.product.name, quantity: item.quantity })),
      giftOptions
    };
    setOrders((current) => [newOrder, ...current]);
    setCart([]);
    setGiftOptions({ isGift: false, recipientName: '', note: '', packagingId: '' });
  };

  return (
    <main className="page">
      <header className="header">
        <h1>StoreFlow</h1>
        <p>Shop, gift, and fulfill orders from one modern workflow.</p>
        <div className="roles">
          {(['customer', 'admin', 'staff'] as Role[]).map((value) => (
            <button
              key={value}
              onClick={() => setRole(value)}
              className={role === value ? 'active' : ''}
            >
              {value}
            </button>
          ))}
        </div>
      </header>

      {role === 'customer' && (
        <section className="grid two-col">
          <article className="panel">
            <h2>Browse Products</h2>
            <div className="filters">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products"
              />
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option>All</option>
                <option>Home</option>
                <option>Fashion</option>
                <option>Beauty</option>
                <option>Electronics</option>
              </select>
            </div>
            <div className="products">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="emoji">{product.image}</div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>
                    <strong>${product.price}</strong> · {product.stock} in stock
                  </p>
                  <button onClick={() => addToCart(product.id)}>Add to cart</button>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <h2>Cart & Checkout</h2>
            {cartProducts.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cartProducts.map(({ product, quantity }) => (
                  <div key={product.id} className="cart-row">
                    <span>{product.name}</span>
                    <div>
                      <button onClick={() => updateQuantity(product.id, quantity - 1)}>-</button>
                      <span className="qty">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
                    </div>
                  </div>
                ))}
              </>
            )}

            <div className="gift-box">
              <label>
                <input
                  type="checkbox"
                  checked={giftOptions.isGift}
                  onChange={(event) =>
                    setGiftOptions((current) => ({ ...current, isGift: event.target.checked }))
                  }
                />
                This is a gift
              </label>
              {giftOptions.isGift && (
                <>
                  <input
                    placeholder="Recipient name"
                    value={giftOptions.recipientName}
                    onChange={(event) =>
                      setGiftOptions((current) => ({ ...current, recipientName: event.target.value }))
                    }
                  />
                  <textarea
                    placeholder="Gift note (optional, +$4)"
                    value={giftOptions.note}
                    onChange={(event) =>
                      setGiftOptions((current) => ({ ...current, note: event.target.value }))
                    }
                  />
                  <select
                    value={giftOptions.packagingId}
                    onChange={(event) =>
                      setGiftOptions((current) => ({ ...current, packagingId: event.target.value }))
                    }
                  >
                    <option value="">Choose packaging</option>
                    {packagingOptions
                      .filter((pack) => pack.active)
                      .map((pack) => (
                        <option key={pack.id} value={pack.id}>
                          {pack.name} (${pack.price})
                        </option>
                      ))}
                  </select>
                </>
              )}
            </div>

            <div className="summary">
              <p>Items: ${subtotal}</p>
              <p>Packaging: ${packagingPrice}</p>
              <p>Gift note: ${notePrice}</p>
              <p>Shipping: ${cartProducts.length ? SHIPPING_FEE : 0}</p>
              <p>
                <strong>Total: ${total}</strong>
              </p>
            </div>
            <button onClick={placeOrder} disabled={!cartProducts.length}>
              Place order
            </button>
          </article>
        </section>
      )}

      {role === 'admin' && (
        <section className="grid two-col">
          <article className="panel">
            <h2>Order Management</h2>
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <h3>
                  {order.id} · {order.customerName}
                </h3>
                <p>Status: {order.status}</p>
                <p>
                  Items:{' '}
                  {order.items.map((item) => `${item.productName} x${item.quantity}`).join(', ')}
                </p>
                {order.giftOptions.isGift && (
                  <p>
                    Gift → To: {order.giftOptions.recipientName || 'N/A'} | Note:{' '}
                    {order.giftOptions.note || 'No note'} | Packaging: {order.giftOptions.packagingId}
                  </p>
                )}
                <select
                  value={order.status}
                  onChange={(event) => updateOrderStatus(order.id, event.target.value as OrderStatus)}
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </div>
            ))}
          </article>

          <article className="panel">
            <h2>Operations Console</h2>
            <h3>Inventory</h3>
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  {product.name} — {product.stock} units — ${product.price}
                </li>
              ))}
            </ul>
            <h3>Packaging</h3>
            <ul>
              {packagingOptions.map((pack) => (
                <li key={pack.id}>
                  {pack.name} (${pack.price}) — {pack.active ? 'Active' : 'Inactive'}
                </li>
              ))}
            </ul>
            <h3>Staff Access</h3>
            <p>Roles configured: Admin (full access), Staff (orders & delivery updates only).</p>
            <h3>Sales Snapshot</h3>
            <p>
              Total orders: {orders.length} | Delivered:{' '}
              {orders.filter((order) => order.status === 'Delivered').length}
            </p>
          </article>
        </section>
      )}

      {role === 'staff' && (
        <section className="panel">
          <h2>Staff Dashboard</h2>
          <p>Assigned deliveries and status updates (no product deletion access).</p>
          {orders
            .filter((order) => order.assignedTo)
            .map((order) => (
              <div key={order.id} className="order-card">
                <h3>
                  {order.id} - {order.customerName}
                </h3>
                <p>Assigned to: {order.assignedTo}</p>
                <p>Current status: {order.status}</p>
                <select
                  value={order.status}
                  onChange={(event) => updateOrderStatus(order.id, event.target.value as OrderStatus)}
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </div>
            ))}
        </section>
      )}
    </main>
  );
}
