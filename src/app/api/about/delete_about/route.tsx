import { NextRequest } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import path from 'path';
import fs from 'fs/promises';

// Define the type for the query result
interface AboutResult {
  image_link: string;
}

export async function DELETE(req: NextRequest) {
  try {
    // Get the About ID from the query parameters
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'About ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const connection = await dbConnect(); // Connect to the database

    // Check if the about entry exists
    const [result] = await connection.query<AboutResult[]>(
      'SELECT image_link FROM about WHERE id = ?',
      [id]
    );

    if (result.length === 0) {
      return new Response(
        JSON.stringify({ error: 'About entry not found' }),
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

    // Delete the About record from the database
    await connection.query('DELETE FROM about WHERE id = ?', [id]);

    return new Response(
      JSON.stringify({ message: 'About entry deleted successfully' }),
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
