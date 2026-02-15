# Product Requirements Document (PRD)

## Product Name
StoreFlow

## Product Type
E-commerce Web Application (with gifting & packaging)

---

## 1. Objective
Build a modern e-commerce platform where users can shop, customize gifts (notes + packaging), and checkout seamlessly, while admins manage inventory, orders, and fulfillment efficiently.

## 2. Target Users
- **Customers:** Online shoppers and gift buyers
- **Admin:** Store owner
- **Staff:** Inventory and delivery managers

## 3. Core Features

### 3.1 Customer Features
- User registration and login
- Browse products (categories, search, filters)
- Product details (images, price, stock)
- Add to cart, remove items, update quantity
- Checkout flow:
  - Delivery address
  - Payment
  - Order summary
- **Gift options (optional):**
  - Mark order as gift
  - Recipient name
  - Custom note (extra fee)
  - Choose packaging material (priced)
- Order confirmation and receipt
- Order tracking (Pending → Shipped → Delivered)
- Order history

### 3.2 Cart and Checkout
- Dynamic pricing (items + packaging + gift note)
- Shipping fee calculation
- Promo/discount support (future)
- Payment gateway integration

### 3.3 Admin Dashboard
- Secure admin login
- View orders by status:
  - Pending
  - Processing
  - Shipped
  - Delivered
- Update order status
- View gift details (note, packaging)
- Inventory management:
  - Add/edit/delete products
  - Stock quantity control
- Packaging management:
  - Add packaging types
  - Set price per packaging
- Staff management (roles and permissions)
- Sales and order analytics (basic)

### 3.4 Staff Dashboard
- View assigned orders
- Update delivery status
- Limited access (no product deletion)

## 4. Functional Requirements

### Products
- Multiple images
- Price
- Stock count
- Category
- Availability status

### Packaging
- Name
- Description
- Price
- Active/inactive status

### Orders
- Unique order ID
- Items list
- Gift flag
- Packaging selected
- Note text
- Status tracking
- Timestamps

## 5. Non-Functional Requirements
- Responsive (mobile and desktop)
- Secure payments
- Fast page load (<2s)
- Role-based access control
- Scalable architecture
- Data encryption (auth and payments)

## 6. Suggested Tech Stack
- **Frontend:** React
- **Backend:** Node.js (Express)
- **Database:** PostgreSQL
- **Auth:** JWT
- **Payments:** Paystack
