import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getAllCars, searchCars } from '@/lib/queries';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = (page - 1) * limit;

    // Check if search/filter
    const brand = searchParams.get('brand');
    const model = searchParams.get('model');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const year = searchParams.get('year');
    const fuelType = searchParams.get('fuelType');
    const transmission = searchParams.get('transmission');

    let cars;

    if (brand || model || minPrice || maxPrice || year || fuelType || transmission) {
      cars = await searchCars(
        {
          brand,
          model,
          minPrice: minPrice ? parseFloat(minPrice) : null,
          maxPrice: maxPrice ? parseFloat(maxPrice) : null,
          year: year ? parseInt(year) : null,
          fuel_type: fuelType,
          transmission,
        },
        limit,
        offset
      );
    } else {
      cars = await getAllCars(limit, offset);
    }

    // Get total count
    const [countResult] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM cars WHERE status = "available"'
    );

    const total = countResult[0].count;

    return NextResponse.json(
      {
        cars,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching cars:', error);
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

    const body = await request.json();
    const {
      title,
      description,
      brand,
      model,
      year,
      price,
      mileage,
      fuelType,
      transmission,
      color,
      condition,
      vin,
      registrationNumber,
      interiorColor,
      bodyType,
      features,
      mainImage,
      images,
    } = body;

    // Decode token to get seller_id (in production, use JWT verification)
    const decodedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

    if (!decodedToken.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate required fields
    if (!title || !brand || !model || !year || !price) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create car listing
    const [result] = await pool.query(
      `INSERT INTO cars (
        seller_id, title, description, brand, model, year, price, mileage,
        fuel_type, transmission, color, condition, VIN, registration_number,
        interior_color, body_type, features, main_image, images
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        decodedToken.id,
        title,
        description,
        brand,
        model,
        year,
        price,
        mileage || 0,
        fuelType,
        transmission,
        color,
        condition,
        vin,
        registrationNumber,
        interiorColor,
        bodyType,
        JSON.stringify(features),
        mainImage,
        JSON.stringify(images),
      ]
    );

    return NextResponse.json(
      {
        message: 'Car listed successfully',
        carId: (result as any).insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating car listing:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
