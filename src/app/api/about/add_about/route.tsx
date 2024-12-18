import { NextRequest } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req: NextRequest) {
  let connection;

  try {
    const formData = await req.formData();
    const description = formData.get('description') as string;
    const file = formData.get('file') as File;

    if (!description || !file) {
      return new Response(
        JSON.stringify({ error: 'Description and file are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    connection = await dbConnect(); // Connect to the database
    const uploadDir = path.join(process.cwd(), 'public/uploads/about');

    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Get the latest file number
    const files = await fs.readdir(uploadDir);
    const aboutFiles = files.filter(f => /^about_\d{5}\.(jpg|jpeg|png|gif)$/.test(f));
    let nextNumber = 10000;

    if (aboutFiles.length > 0) {
      const latestFile = aboutFiles.sort().pop(); // Get the last file
      if (latestFile) {
        const latestNumber = parseInt(latestFile.match(/\d{5}/)?.[0] || '10000');
        nextNumber = latestNumber + 1;
      }
    }

    // Set the new file name
    const extension = file.name.split('.').pop();
    const newFileName = `about_${nextNumber.toString().padStart(5, '0')}.${extension}`;

    // Save the file to the upload directory
    const filePath = path.join(uploadDir, newFileName);
    const fileBuffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(fileBuffer));

    // Fetch the maximum index from the about table
    const [rows] = await connection.execute('SELECT MAX(`index`) as maxIndex FROM about');
    const maxIndex = (rows as { maxIndex: number }[])[0]?.maxIndex ?? 0;

    // Insert record into the About table with the new index
    const newIndex = maxIndex + 1;
    const imageLink = `/uploads/about/${newFileName}`;
    await connection.execute(
      'INSERT INTO about (id, `index`, description, image_link) VALUES (?, ?, ?, ?)',
      [`ABOUT_${nextNumber}`, newIndex, description, imageLink]
    );

    return new Response(
      JSON.stringify({ message: 'About entry added successfully' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
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
