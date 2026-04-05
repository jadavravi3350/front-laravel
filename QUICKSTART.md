# 🚀 Quick Start Guide - CarMarket

## Step 1: Setup Database

### Option A: Using MySQL Command Line
```bash
mysql -u root -p < database.sql
```

### Option B: Using MySQL Workbench or phpMyAdmin
1. Copy the entire `database.sql` content
2. Paste into your SQL editor
3. Execute the script

## Step 2: Configure Environment

Edit `.env.local`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=car_marketplace

JWT_SECRET=super_secret_key_change_this_in_production

API_URL=http://localhost:3000
API_PORT=3001
UPLOAD_DIR=public/uploads
```

## Step 3: Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit: **http://localhost:3000**

## Step 4: Create Test Users

### Register as Buyer:
- Go to `/register`
- Enter email: `buyer@test.com`
- Password: `password123`
- Select: "Buyer"
- Click Register

### Register as Seller:
- Go to `/register`
- Enter email: `seller@test.com`
- Password: `password123`
- Select: "Seller"
- Click Register

## Step 5: Test Features

### As Seller:
1. Login with seller account
2. Click "Sell a Car" in navigation
3. Fill in car details
4. Submit
5. Car appears on homepage

### As Buyer:
1. Login with buyer account
2. Browse cars or search
3. Click on a car to view details
4. Click "Add to Cart"
5. Go to Cart page
6. Enter delivery address
7. Select payment method
8. Click "Checkout"
9. View order in Profile

## Project Structure Overview

```
app/
├── api/                 # API endpoints
├── components/          # Reusable components
├── context/            # State management
├── login/              # Login page
├── register/           # Register page
├── cart/               # Cart page
├── cars/[id]/          # Car details
├── profile/            # User profile
├── sell/               # Sell car form
├── admin/              # Admin dashboard
├── layout.tsx          # Root layout
└── page.tsx            # Home page

lib/
├── db.ts               # Database connection
├── auth.ts             # JWT utilities
├── validators.ts       # Form validation
└── queries.ts          # Database helpers

api/
└── Various route handlers
```

## Available Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Cars
- `GET /api/cars` - Get all cars
- `GET /api/cars?brand=Toyota` - Search cars
- `GET /api/cars/[id]` - Get car details
- `POST /api/cars` - Create listing (seller only)

### Shopping
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `DELETE /api/cart` - Remove from cart
- `POST /api/orders` - Place order

### Profile
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile
- `GET /api/orders` - Get orders

## Search & Filter Examples

```
http://localhost:3000/?brand=Toyota
http://localhost:3000/?brand=Honda&minPrice=10000
http://localhost:3000/?year=2020&transmission=Automatic
http://localhost:3000/?fuelType=Electric
```

## Troubleshooting

### Database Error
```bash
# Check MySQL is running
mysql -u root -p -e "SELECT 1"

# Check database exists
mysql -u root -p -e "SHOW DATABASES LIKE 'car_marketplace'"
```

### Port Already in Use
```bash
# Change port in package.json dev script or:
npm run dev -- -p 3001
```

### Authentication Issues
- Clear browser localStorage: `localStorage.clear()`
- Check token in browser console: `localStorage.getItem('token')`

## Next Steps

1. **Add More Cars**: Use the seller dashboard
2. **Test Checkout**: Place test orders
3. **Customize Styling**: Modify Tailwind config
4. **Add Features**: Image uploads, messaging, etc.
5. **Deploy**: Use Vercel, Heroku, or your preferred platform

## Important Notes

⚠️ **Security**:
- Change JWT_SECRET to a strong random string
- Use environment variables, never hardcode secrets
- In production, use HTTPS
- Set secure cookie flags
- Implement rate limiting

✅ **Development Tips**:
- Use browser DevTools to inspect API calls
- Enable MySQL logging for debugging
- Use TypeScript for type safety
- Test with different user roles

## Support

For issues:
1. Check the README_CARMARKET.md
2. Review database.sql for schema
3. Check API endpoint implementations
4. Verify .env.local configuration

Good luck! 🚗✨
