import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

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

    // Get cart items
    const [cartItems] = await pool.query<RowDataPacket[]>(
      `SELECT c.id, c.car_id, c.quantity, ca.title, ca.price, ca.main_image, ca.brand, ca.model, ca.year
       FROM cart c
       JOIN cars ca ON c.car_id = ca.id
       WHERE c.user_id = ?`,
      [decodedToken.id]
    );

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return NextResponse.json(
      {
        items: cartItems,
        total,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

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
    const { carId, quantity = 1 } = body;

    if (!carId) {
      return NextResponse.json(
        { message: 'Car ID is required' },
        { status: 400 }
      );
    }

    // Add to cart
    await pool.query(
      `INSERT INTO cart (user_id, car_id, quantity) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE quantity = quantity + ?`,
      [decodedToken.id, carId, quantity, quantity]
    );

    return NextResponse.json(
      { message: 'Added to cart' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
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
    const { cartId } = body;

    if (!cartId) {
      return NextResponse.json(
        { message: 'Cart ID is required' },
        { status: 400 }
      );
    }

    // Remove from cart
    await pool.query(
      'DELETE FROM cart WHERE id = ? AND user_id = ?',
      [cartId, decodedToken.id]
    );

    return NextResponse.json(
      { message: 'Removed from cart' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
