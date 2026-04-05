import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decodedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    const body = await request.json();
    const { cartItems, deliveryAddress, paymentMethod, notes } = body;

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { message: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Create orders for each car
    for (const item of cartItems) {
      const [cars] = await pool.query<RowDataPacket[]>(
        'SELECT price, seller_id FROM cars WHERE id = ?',
        [item.car_id]
      );

      if (cars.length === 0) {
        continue;
      }

      const car = cars[0];

      await pool.query(
        `INSERT INTO orders (buyer_id, car_id, seller_id, total_amount, delivery_address, payment_method, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          decodedToken.id,
          item.car_id,
          car.seller_id,
          car.price,
          deliveryAddress,
          paymentMethod,
          notes,
        ]
      );

      // Update car status to sold
      await pool.query(
        'UPDATE cars SET status = "sold" WHERE id = ?',
        [item.car_id]
      );
    }

    // Clear cart
    await pool.query(
      'DELETE FROM cart WHERE user_id = ?',
      [decodedToken.id]
    );

    return NextResponse.json(
      { message: 'Order placed successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decodedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

    // Get user orders
    const [orders] = await pool.query<RowDataPacket[]>(
      `SELECT o.*, c.title, c.brand, c.model, c.year, c.main_image, u.first_name, u.last_name, u.email, u.phone
       FROM orders o
       JOIN cars c ON o.car_id = c.id
       JOIN users u ON o.seller_id = u.id
       WHERE o.buyer_id = ?
       ORDER BY o.created_at DESC`,
      [decodedToken.id]
    );

    return NextResponse.json(
      { orders },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
