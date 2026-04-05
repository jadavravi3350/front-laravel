# 🚗 CarMarket - Peer-to-Peer Car Marketplace

A full-stack car marketplace application built with **Next.js 16**, **React 19**, **TypeScript**, **MySQL**, and **Tailwind CSS**.

## Features

✅ **Car Listings** - Browse, search, and filter cars  
✅ **User Accounts** - Buyer and seller accounts with authentication  
✅ **Shopping Cart** - Add cars to cart and checkout  
✅ **Search & Filter** - Filter by brand, model, price, fuel type, transmission, etc.  
✅ **User Profiles** - View and manage profile information  
✅ **Order Management** - Track purchase orders and status  
✅ **Seller Dashboard** - List cars for sale  
✅ **Admin Dashboard** - Manage platform (placeholder)  
✅ **Responsive Design** - Mobile-friendly UI  
✅ **JWT Authentication** - Secure user authentication  

## Tech Stack

### Frontend
- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Axios** - HTTP client

### Backend
- **Next.js API Routes** - API endpoints
- **Express.js** (optional) - Additional backend support
- **Node.js** - Runtime

### Database
- **MySQL** - Relational database
- **mysql2/promise** - MySQL driver

### Authentication
- **JWT** - JSON Web Tokens
- **Bcrypt** - Password hashing

## Project Structure

```
my-app/
├── app/
│   ├── api/                    # API endpoints
│   │   ├── auth/              # Authentication routes
│   │   ├── cars/              # Car listing routes
│   │   ├── cart/              # Shopping cart routes
│   │   ├── orders/            # Order routes
│   │   └── users/             # User profile routes
│   ├── components/            # Reusable React components
│   │   ├── Header.tsx
│   │   ├── CarCard.tsx
│   │   └── SearchFilter.tsx
│   ├── context/               # React context for state
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   ├── (routes)/              # App routes
│   │   ├── login/
│   │   ├── register/
│   │   ├── cart/
│   │   ├── cars/
│   │   ├── profile/
│   │   ├── sell/
│   │   └── admin/
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── lib/                        # Utility functions
│   ├── db.ts                  # Database connection
│   ├── auth.ts                # Auth utilities
│   ├── validators.ts          # Input validation
│   └── queries.ts             # Database queries
├── public/
│   └── uploads/               # User uploaded files
├── database.sql               # Database schema
├── .env.local                 # Environment variables
├── package.json               # Dependencies
└── README.md                  # This file
```

## Getting Started

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd my-app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up the database**

Create a MySQL database and run the schema:
```bash
mysql -u root -p < database.sql
```

4. **Configure environment variables**

Edit `.env.local`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=car_marketplace

JWT_SECRET=your_jwt_secret_key_change_this
API_URL=http://localhost:3000
API_PORT=3001
```

5. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

Visit http://localhost:3000 in your browser.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Cars
- `GET /api/cars` - Get all cars with pagination
- `GET /api/cars?brand=Toyota&minPrice=10000&maxPrice=50000` - Search/filter cars
- `POST /api/cars` - Create new car listing (seller only)
- `GET /api/cars/[id]` - Get car details

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add to cart
- `DELETE /api/cart` - Remove from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create order/checkout

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## Sample Data

To add sample cars to your database, run:

```sql
INSERT INTO cars (seller_id, title, brand, model, year, price, mileage, fuel_type, transmission, color, condition, status) 
VALUES 
(1, '2020 Toyota Camry', 'Toyota', 'Camry', 2020, 22000, 45000, 'Petrol', 'Automatic', 'Silver', 'Used', 'available'),
(1, '2019 Honda Civic', 'Honda', 'Civic', 2019, 19000, 52000, 'Petrol', 'Manual', 'Black', 'Used', 'available'),
(1, '2021 Tesla Model 3', 'Tesla', 'Model 3', 2021, 45000, 20000, 'Electric', 'Automatic', 'White', 'Used', 'available');
```

## Usage

### As a Buyer
1. Register as a Buyer
2. Browse cars or use search/filter
3. Click on a car to view details
4. Add to cart
5. Go to cart and checkout
6. View orders in profile

### As a Seller
1. Register as a Seller
2. Go to Profile → Sell a Car
3. Fill in car details
4. Submit listing
5. Your car will appear in the marketplace

### As an Admin
1. Register with admin user type (requires database modification)
2. Access admin dashboard at `/admin`
3. Manage users, cars, and orders

## Features to Implement

- [ ] Image upload functionality
- [ ] Real-time chat between buyer and seller
- [ ] Car reviews and ratings
- [ ] Payment processing integration
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Mobile app (React Native/Flutter)
- [ ] API rate limiting
- [ ] User verification system

## Database Schema

### Key Tables
- **users** - User accounts (buyers, sellers, admins)
- **cars** - Car listings
- **cart** - Shopping cart items
- **orders** - Purchase orders
- **reviews** - Car reviews and ratings
- **favorites** - User favorites
- **messages** - Seller-buyer communication

## Security Notes

- ⚠️ Change `JWT_SECRET` to a strong random string
- ⚠️ Use HTTPS in production
- ⚠️ Implement rate limiting
- ⚠️ Add CORS configuration
- ⚠️ Sanitize user inputs
- ⚠️ Store sensitive data securely
- ⚠️ Implement proper error handling

## Deployment

### Vercel (Recommended for Next.js)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- AWS Amplify
- Heroku
- DigitalOcean
- Netlify

## Troubleshooting

### Database Connection Error
- Ensure MySQL is running
- Check credentials in `.env.local`
- Verify database exists

### Authentication Issues
- Clear browser localStorage
- Check JWT_SECRET is set
- Verify token in API headers

### Car Listing Issues
- Ensure seller is logged in
- Verify seller_id matches user.id
- Check image URLs are valid

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues and questions, please create an issue on the repository.

---

**Happy selling and buying! 🚗✨**
