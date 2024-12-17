import { dbConnect } from '@/app/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET() {
  try {
    const connection = await dbConnect(); // Connect to the database

    // Fetch all entries from the Packages table
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT id, name, price, image_link, `index`, description FROM packages ORDER BY `index` ASC'
    );

    // Return the rows as a JSON response
    return new Response(
      JSON.stringify({ packages: rows }),
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
