import pool from './db';
import { RowDataPacket } from 'mysql2';

export const getUserById = async (id: number) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, email, first_name, last_name, phone, city, state, country, user_type, profile_image FROM users WHERE id = ?',
    [id]
  );
  return rows[0] || null;
};

export const getUserByEmail = async (email: string) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0] || null;
};

export const getCarById = async (id: number) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM cars WHERE id = ?',
    [id]
  );
  return rows[0] || null;
};

export const getAllCars = async (limit = 20, offset = 0) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM cars WHERE status = "available" ORDER BY created_at DESC LIMIT ? OFFSET ?',
    [limit, offset]
  );
  return rows;
};

export const searchCars = async (filters: any, limit = 20, offset = 0) => {
  let query = 'SELECT * FROM cars WHERE status = "available"';
  const params: any[] = [];

  if (filters.brand) {
    query += ' AND brand LIKE ?';
    params.push(`%${filters.brand}%`);
  }
  if (filters.model) {
    query += ' AND model LIKE ?';
    params.push(`%${filters.model}%`);
  }
  if (filters.year) {
    query += ' AND year = ?';
    params.push(filters.year);
  }
  if (filters.minPrice) {
    query += ' AND price >= ?';
    params.push(filters.minPrice);
  }
  if (filters.maxPrice) {
    query += ' AND price <= ?';
    params.push(filters.maxPrice);
  }
  if (filters.fuel_type) {
    query += ' AND fuel_type = ?';
    params.push(filters.fuel_type);
  }
  if (filters.transmission) {
    query += ' AND transmission = ?';
    params.push(filters.transmission);
  }

  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  const [rows] = await pool.query<RowDataPacket[]>(query, params);
  return rows;
};
