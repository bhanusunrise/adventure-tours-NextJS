import { NextRequest } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import path from 'path';
import fs from 'fs/promises';
import { RowDataPacket } from 'mysql2';

// Define the type for the query result
interface PackageResult {
  image_link: string;
}

export async function DELETE(req: NextRequest) {
  try {
    // Get the Package ID from the query parameters
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'Package ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const connection = await dbConnect(); // Connect to the database

    // Check if the package entry exists
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT image_link FROM packages WHERE id = ?',
      [id]
    );

    // Since `rows` is a `RowDataPacket[]`, we can manually cast it to `PackageResult[]`
    const result: PackageResult[] = rows as PackageResult[];

    if (result.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Package entry not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get the image link from the result
    const imageLink = result[0].image_link;

    // Remove the image file from the server if it exists
    if (imageLink) {
      const filePath = path.join(process.cwd(), 'public', imageLink);
      try {
        await fs.unlink(filePath); // Delete the image file
        console.log(`Image deleted: ${filePath}`);
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    }

    // Delete related entries from Package_Activities and Package_Locations tables
    await connection.query('DELETE FROM package_activities WHERE package_id = ?', [id]);
    await connection.query('DELETE FROM package_locations WHERE package_id = ?', [id]);

    // Delete the package record from the packages table
    await connection.query('DELETE FROM packages WHERE id = ?', [id]);

    return new Response(
      JSON.stringify({ message: 'Package entry and related data deleted successfully' }),
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
