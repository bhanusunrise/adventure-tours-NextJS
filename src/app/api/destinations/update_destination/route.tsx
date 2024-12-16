import { NextRequest } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import path from 'path';
import fs from 'fs/promises';

export async function PUT(req: NextRequest) {
  let connection;

  try {
    const formData = await req.formData();
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const file = formData.get('file') as File | null;

    if (!id || !name) {
      return new Response(
        JSON.stringify({ error: 'ID and name are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    connection = await dbConnect(); // Connect to the database

    let imageLink = null;
    if (file) {
      const uploadDir = path.join(process.cwd(), 'public/uploads/destinations');

      // Ensure the upload directory exists
      await fs.mkdir(uploadDir, { recursive: true });

      // Generate a new file name based on the ID
      const extension = file.name.split('.').pop();
      const newFileName = `place_${id.slice(-5)}.${extension}`;

      // Save the new file
      const filePath = path.join(uploadDir, newFileName);
      const fileBuffer = await file.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(fileBuffer));

      console.log(`File saved at: ${filePath}`); // Log the file path for debugging

      // Verify that the file exists
      const fileExists = await fs.stat(filePath).catch(() => false);
      if (!fileExists) {
        console.error('File not found after saving!');
        return new Response(
          JSON.stringify({ error: 'File could not be saved.' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      imageLink = `/uploads/destinations/${newFileName}`;
    }

    // Update the Destinations record in the database
    if (imageLink) {
      await connection.query(
        'UPDATE destinations SET name = ?, image_link = ? WHERE id = ?',
        [name, imageLink, id]
      );
    } else {
      await connection.query(
        'UPDATE destinations SET name = ? WHERE id = ?',
        [name, id]
      );
    }

    return new Response(
      JSON.stringify({ message: 'Destination updated successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
