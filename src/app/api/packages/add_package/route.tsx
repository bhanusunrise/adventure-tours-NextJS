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
    const activities = formData.get('activities') as string; // A string representing a JSON array or comma-separated list
    const locations = formData.get('locations') as string; // A string representing a JSON array or comma-separated list
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

    // Get the latest package number for generating the new package ID
    const [packageRows] = await connection.execute(
      "SELECT MAX(CAST(SUBSTRING(id, 6) AS UNSIGNED)) AS maxId FROM packages"
    );
    let nextPackageNumber = (packageRows as { maxId: number }[])[0]?.maxId ?? 10000;
    nextPackageNumber += 1;

    // Set the new package file name
    const extension = file.name.split('.').pop();
    const newFileName = `PACK_${nextPackageNumber.toString().padStart(5, '0')}.${extension}`;

    // Save the file to the upload directory
    const filePath = path.join(uploadDir, newFileName);
    const fileBuffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(fileBuffer));

    // Insert record into the Packages table
    const imageLink = `/uploads/packages/${newFileName}`;
    const packageId = `PACK_${nextPackageNumber}`;

    await connection.execute(
      'INSERT INTO packages (id, name, price, `index`, image_link, description) VALUES (?, ?, ?, ?, ?, ?)',
      [packageId, name, price, index, imageLink, description]
    );

    // Insert activities into Package_Activities table
    const activityList = JSON.parse(activities); // Parse activities JSON string to an array
    const [activityRows] = await connection.execute(
      "SELECT MAX(CAST(SUBSTRING(id, 6) AS UNSIGNED)) AS maxId FROM package_activities"
    );
    let nextActivityNumber = (activityRows as { maxId: number }[])[0]?.maxId ?? 10000;

    for (const activity of activityList) {
      nextActivityNumber += 1;
      const activityId = `PACT_${nextActivityNumber}`;
      await connection.execute(
        'INSERT INTO package_activities (id, package_id, name) VALUES (?, ?, ?)',
        [activityId, packageId, activity]
      );
    }

    // Insert locations into Package_Locations table
    const locationList = JSON.parse(locations); // Parse locations JSON string to an array
    const [locationRows] = await connection.execute(
      "SELECT MAX(CAST(SUBSTRING(id, 6) AS UNSIGNED)) AS maxId FROM package_locations"
    );
    let nextLocationNumber = (locationRows as { maxId: number }[])[0]?.maxId ?? 10000;

    for (const location of locationList) {
      nextLocationNumber += 1;
      const locationId = `PLOC_${nextLocationNumber}`;
      await connection.execute(
        'INSERT INTO package_locations (id, package_id, name) VALUES (?, ?, ?)',
        [locationId, packageId, location]
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
