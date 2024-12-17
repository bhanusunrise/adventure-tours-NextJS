import { dbConnect } from '@/app/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET() {
  try {
    const connection = await dbConnect(); // Connect to the database

    // Fetch packages along with activities and locations using JOINs
    const [packages] = await connection.query<RowDataPacket[]>(
      `
      SELECT 
        p.id, 
        p.name, 
        p.price, 
        p.image_link, 
        p.\`index\`, 
        p.description,
        GROUP_CONCAT(DISTINCT pl.name) AS locations,
        GROUP_CONCAT(DISTINCT pa.name) AS activities
      FROM 
        packages p
      LEFT JOIN 
        package_locations pl ON p.id = pl.package_id
      LEFT JOIN 
        package_activities pa ON p.id = pa.package_id
      GROUP BY 
        p.id, p.name, p.price, p.image_link, p.\`index\`, p.description
      ORDER BY 
        p.\`index\` ASC
      `
    );

    // Transform the results to split `locations` and `activities` into arrays
    const result = packages.map((pkg) => ({
      ...pkg,
      locations: pkg.locations ? pkg.locations.split(',') : [],
      activities: pkg.activities ? pkg.activities.split(',') : [],
    }));

    // Return the rows as a JSON response
    return new Response(
      JSON.stringify({ packages: result }),
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
