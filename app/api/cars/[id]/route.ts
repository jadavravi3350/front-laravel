import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const carId = parseInt(params.id);

    // Get car details
    const [cars] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM cars WHERE id = ?',
      [carId]
    );

    if (cars.length === 0) {
      return NextResponse.json(
        { message: 'Car not found' },
        { status: 404 }
      );
    }

    const car = cars[0];

    // Get seller info
    const [sellers] = await pool.query<RowDataPacket[]>(
      'SELECT id, first_name, last_name, phone, profile_image, email FROM users WHERE id = ?',
      [car.seller_id]
    );

    // Get reviews
    const [reviews] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM reviews WHERE car_id = ? ORDER BY created_at DESC',
      [carId]
    );

    // Increment view count
    await pool.query(
      'UPDATE cars SET views = views + 1 WHERE id = ?',
      [carId]
    );

    return NextResponse.json(
      {
        car: {
          ...car,
          images: car.images ? JSON.parse(car.images) : [],
          features: car.features ? JSON.parse(car.features) : [],
        },
        seller: sellers[0] || null,
        reviews,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching car details:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
