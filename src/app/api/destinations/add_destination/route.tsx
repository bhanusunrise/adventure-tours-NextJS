import { NextRequest } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req: NextRequest) {
  let connection;

  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const price = formData.get('price') as string;
    const index = parseInt(formData.get('index') as string, 10);
    const description = formData.get('description') as string;
    const activities = formData.get('activities') as string; // A string representing a JSON array
    const locations = formData.get('locations') as string;  // A string representing a JSON array
    const file = formData.get('file') as File;

    if (!name || !price || isNaN(index) || !file || !description || !activities || !locations) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    connection = await dbConnect(); // Connect to the database
    const uploadDir = path.join(process.cwd(), 'public/uploads/packages');

    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Get the latest file number for renaming
    const files = await fs.readdir(uploadDir);
    const packageFiles = files.filter(f => /^PACK_\d{5}\.(jpg|jpeg|png|gif)$/.test(f));
    let nextNumber = 10000;

    if (packageFiles.length > 0) {
      const latestFile = packageFiles.sort().pop(); // Get the last file
      if (latestFile) {
        const latestNumber = parseInt(latestFile.match(/\d{5}/)?.[0] || '10000');
        nextNumber = latestNumber + 1;
      }
    }

    // Set the new file name
    const extension = file.name.split('.').pop();
    const newFileName = `PACK_${nextNumber.toString().padStart(5, '0')}.${extension}`;

    // Save the file to the upload directory
    const filePath = path.join(uploadDir, newFileName);
    const fileBuffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(fileBuffer));

    // Insert record into the Packages table
    const imageLink = `/uploads/packages/${newFileName}`;
    await connection.execute(
      'INSERT INTO packages (id, name, price, `index`, image_link, description) VALUES (?, ?, ?, ?, ?, ?)',
      [`PACK_${nextNumber}`, name, price, index, imageLink, description]
    );

    const packageId = `PACK_${nextNumber}`;

    // Insert activities into Package_Activities table with manually generated IDs
    const activityList = JSON.parse(activities); // Parse activities JSON string to an array
    const [activityRows] = await connection.execute(
      'SELECT MAX(CAST(SUBSTRING(id, 5) AS UNSIGNED)) AS maxActivityId FROM package_activities'
    );
    let nextActivityId = (activityRows as { maxActivityId: number }[])[0]?.maxActivityId ?? 10000;

    for (const activity of activityList) {
      nextActivityId += 1;
      await connection.execute(
        'INSERT INTO package_activities (id, package_id, name) VALUES (?, ?, ?)',
        [`pact${nextActivityId}`, packageId, activity]
      );
    }

    // Insert locations into Package_Locations table with manually generated IDs
    const locationList = JSON.parse(locations); // Parse locations JSON string to an array
    const [locationRows] = await connection.execute(
      'SELECT MAX(CAST(SUBSTRING(id, 5) AS UNSIGNED)) AS maxLocationId FROM package_locations'
    );
    let nextLocationId = (locationRows as { maxLocationId: number }[])[0]?.maxLocationId ?? 10000;

    for (const location of locationList) {
      nextLocationId += 1;
      await connection.execute(
        'INSERT INTO package_locations (id, package_id, name) VALUES (?, ?, ?)',
        [`ploc${nextLocationId}`, packageId, location]
      );
    }

    return new Response(
      JSON.stringify({ message: 'Package added successfully' }),
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
