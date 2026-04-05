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

    // Get user profile
    const [users] = await pool.query<RowDataPacket[]>(
      'SELECT id, email, first_name, last_name, phone, city, state, country, user_type, profile_image FROM users WHERE id = ?',
      [decodedToken.id]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { user: users[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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
    const { firstName, lastName, phone, city, state, country, profileImage } = body;

    // Update user profile
    await pool.query(
      `UPDATE users SET first_name = ?, last_name = ?, phone = ?, city = ?, state = ?, country = ?, profile_image = ?
       WHERE id = ?`,
      [firstName, lastName, phone, city, state, country, profileImage, decodedToken.id]
    );

    return NextResponse.json(
      { message: 'Profile updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
