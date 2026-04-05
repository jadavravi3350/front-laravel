# 🚗 CarMarket - Demo Version (Dummy Data)

**Database-Free Demo!** ✅ No database needed | ✅ No API setup required | ✅ Ready to run immediately

## ⚡ Quick Start (30 seconds)

```bash
npm install
npm run dev
```

Visit: **http://localhost:3000**

Done! 🎉

---

## 👤 Test Accounts

Use these credentials to login:

### Buyer Account
- **Email**: `buyer@test.com`
- **Password**: `password`
- **Role**: Buyer (can shop and checkout)

### Seller Account
- **Email**: `seller@test.com`
- **Password**: `password`
- **Role**: Seller (can list cars for sale)

### Admin Account
- **Email**: `admin@test.com`
- **Password**: `password`
- **Role**: Admin (can manage platform)

---

## 🎨 Features to Try

### 1️⃣ **Browse Cars**
- Home page shows 6 dummy cars
- Click on any car to see details
- View seller information

### 2️⃣ **Search & Filter**
- Filter by brand, model, year, price, fuel type, transmission
- Live filtering on homepage

### 3️⃣ **Shopping Cart**
- Add cars to cart from car details
- View cart items
- Add delivery address
- Select payment method
- Checkout to place order

### 4️⃣ **User Profile**
- View account information
- Edit profile details
- View order history (dummy orders shown for buyer)
- Logout

### 5️⃣ **Sell a Car** (Seller only)
- Navigate to "Sell Car" 
- Fill in car details
- Submit to list car
- See confirmation

### 6️⃣ **Admin Dashboard** (Admin only)
- View stats and analytics
- Manage users, cars, orders
- View recent activity

---

## 📊 Dummy Data Included

### Cars (6 total)
1. 2020 Toyota Camry - $22,000
2. 2019 Honda Civic - $19,000
3. 2021 Tesla Model 3 - $45,000
4. 2018 BMW X5 - $35,000
5. 2022 Ford F-150 - $55,000
6. 2020 Chevrolet Malibu - $21,000

### Sample Orders
- Buyer has 2 sample orders in profile
- One completed, one pending

### Sellers
- Multiple sellers with contact info

---

## 🗂️ File Structure (Dummy Data Areas)

```
app/
├── page.tsx                    ← DUMMY_CARS array
├── login/page.tsx              ← dummyUsers object
├── register/page.tsx           ← Creates random user ID
├── cars/[id]/page.tsx          ← DUMMY_CARS_DETAIL object
├── cart/page.tsx               ← DUMMY_CART_ITEMS array
├── profile/page.tsx            ← DUMMY_ORDERS array
├── sell/page.tsx               ← Shows success message
├── admin/page.tsx              ← DUMMY stats
└── components/Header.tsx       ← Uses localStorage
```

---

## 💾 Data Storage

All data is stored in **browser localStorage**:
```javascript
localStorage.getItem('user')      // Current user
localStorage.getItem('token')     // Session token
```

**Note**: Data clears when browser cache is cleared!

---

## ✅ What Works

- ✅ User authentication (dummy)
- ✅ Car listings & browsing
- ✅ Search & filtering
- ✅ Car details page
- ✅ Shopping cart (add/remove)
- ✅ Checkout flow
- ✅ Order management
- ✅ User profile
- ✅ Seller dashboard (form submission)
- ✅ Admin dashboard
- ✅ Responsive design
- ✅ Navigation between pages

---

## 🚀 Next Steps

When ready to add real functionality:

1. **Connect to Database**
   - Set up MySQL with database.sql
   - Update environment variables

2. **Add API Calls**
   - Replace dummy data with actual API endpoints
   - Implement backend routes

3. **Enable Image Upload**
   - Add file upload for car images
   - Configure storage

4. **Add Payment Processing**
   - Integrate payment gateway
   - Handle transactions

5. **Deploy**
   - Push to production
   - Set up database on production server

---

## 🎯 Testing Workflow

### Test as Buyer:
1. Go to `/register`
2. Create a new buyer account
3. Browse cars on homepage
4. Click a car to see details
5. Add to cart
6. Go to `/cart`
7. Enter delivery address
8. Click checkout
9. View orders in profile

### Test as Seller:
1. Login with `seller@test.com`
2. Click "Sell Car" in nav
3. Fill in car form
4. Submit
5. See success message
6. Return to profile

### Test as Admin:
1. Go to `/login`
2. Login with `admin@test.com`
3. Click "Admin" in nav
4. View dashboard stats

---

## 📱 Mobile Responsive

The app works great on mobile! Try resizing your browser.

---

## 🐛 Troubleshooting

**"Cart doesn't show items I added"**
- Cart is demo-based, shows hardcoded item
- Real implementation will persist across sessions

**"Login says invalid email"**
- Use exact emails: `buyer@test.com`, `seller@test.com`, `admin@test.com`
- Password is always `password`

**"Orders don't save"**
- Orders are dummy data, they stay the same
- Real database will save actual orders

**"Can't find sell page"**
- Must be logged in as seller
- Login with `seller@test.com` first

---

## 🎓 Learning Resources

This demo showcases:
- ✅ Next.js 16 architecture
- ✅ React 19 components
- ✅ TypeScript patterns
- ✅ Tailwind CSS styling
- ✅ localStorage usage
- ✅ Client-side filtering
- ✅ Form handling
- ✅ Responsive design

---

## 💡 Usage Example

```javascript
// Example: How dummy data works
const DUMMY_CARS = [
  { id: 1, title: '2020 Toyota Camry', ... },
  { id: 2, title: '2019 Honda Civic', ... },
  ...
];

// Filter locally
const filtered = DUMMY_CARS.filter(car => 
  car.brand === 'Toyota'
);
```

---

## 📞 Support

- Check console for logs: `Press F12 → Console`
- All data is in localStorage
- No backend required!

---

**Enjoy the demo! 🎉 Ready to build? Replace dummy data with real API calls.**
