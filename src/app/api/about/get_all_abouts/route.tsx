import { NextRequest } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(req: NextRequest) {
  try {
    const connection = await dbConnect(); // Connect to the database

    // Fetch all entries from the About table
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT id, `index`, description, image_link FROM about ORDER BY `index` ASC'
    );

    // Return the rows as a JSON response
    return new Response(
      JSON.stringify({ abouts: rows }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
