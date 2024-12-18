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
    const price = formData.get('price') as string;
    const index = formData.get('index') as string;
    const description = formData.get('description') as string;
    const activities = formData.get('activities') as string; // JSON string for activities
    const locations = formData.get('locations') as string; // JSON string for locations
    const file = formData.get('file') as File | null;

    if (!id || !name || !price || !index || !description || !activities || !locations) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    connection = await dbConnect(); // Connect to the database

    let imageLink = null;
    if (file) {
      const uploadDir = path.join(process.cwd(), 'public/uploads/packages');

      // Ensure the upload directory exists
      await fs.mkdir(uploadDir, { recursive: true });

      // Generate a new file name based on the ID
      const extension = file.name.split('.').pop();
      const newFileName = `PACK_${id.slice(-5)}.${extension}`;

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

      imageLink = `/uploads/packages/${newFileName}`;
    }

    // Update the Packages record in the database
    if (imageLink) {
      await connection.query(
        'UPDATE packages SET name = ?, price = ?, `index` = ?, image_link = ?, description = ? WHERE id = ?',
        [name, price, index, imageLink, description, id]
      );
    } else {
      await connection.query(
        'UPDATE packages SET name = ?, price = ?, `index` = ?, description = ? WHERE id = ?',
        [name, price, index, description, id]
      );
    }

    // Clear existing activities and locations for the package
    await connection.query('DELETE FROM package_activities WHERE package_id = ?', [id]);
    await connection.query('DELETE FROM package_locations WHERE package_id = ?', [id]);

    // Generate unique IDs for activities and insert into Package_Activities table
    const activityList = JSON.parse(activities); // Parse activities JSON string to an array
    let activityCounter = 10000;
    for (const activity of activityList) {
      const activityId = `PACT_${activityCounter++}`;
      await connection.query(
        'INSERT INTO package_activities (id, package_id, name) VALUES (?, ?, ?)',
        [activityId, id, activity]
      );
    }

    // Generate unique IDs for locations and insert into Package_Locations table
    const locationList = JSON.parse(locations); // Parse locations JSON string to an array
    let locationCounter = 10000;
    for (const location of locationList) {
      const locationId = `PLOC_${locationCounter++}`;
      await connection.query(
        'INSERT INTO package_locations (id, package_id, name) VALUES (?, ?, ?)',
        [locationId, id, location]
      );
    }

    return new Response(
      JSON.stringify({ message: 'Package updated successfully' }),
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
