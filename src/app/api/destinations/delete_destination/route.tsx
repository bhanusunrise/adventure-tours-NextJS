import { NextRequest } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import path from 'path';
import fs from 'fs/promises';
import { RowDataPacket } from 'mysql2';

// Define the type for the query result
interface DestinationResult {
  image_link: string;
}

export async function DELETE(req: NextRequest) {
  try {
    // Get the Destination ID from the query parameters
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'Destination ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const connection = await dbConnect(); // Connect to the database

    // Check if the destination entry exists
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT image_link FROM destinations WHERE id = ?',
      [id]
    );

    // Since `rows` is a `RowDataPacket[]`, we can manually cast it to `DestinationResult[]`
    const result: DestinationResult[] = rows as DestinationResult[];

    if (result.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Destination entry not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get the image link from the result
    const imageLink = result[0].image_link;

    // Remove the image file from the server
    const filePath = path.join(process.cwd(), 'public', imageLink);
    try {
      await fs.unlink(filePath); // Delete the image file
    } catch (error) {
      console.error('Error deleting image file:', error);
    }

    // Delete the Destination record from the database
    await connection.query('DELETE FROM destinations WHERE id = ?', [id]);

    return new Response(
      JSON.stringify({ message: 'Destination entry deleted successfully' }),
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
