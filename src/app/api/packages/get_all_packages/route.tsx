import { dbConnect } from '@/app/lib/db';
import { RowDataPacket } from 'mysql2';

interface Location {
  id: string;
  name: string;
}

interface Activity {
  id: string;
  name: string;
}
/*
interface Package {
  id: string;
  name: string;
  price: number;
  image_link: string;
  index: number;
  description: string;
  locations: Location[];
  activities: Activity[];
}*/

export async function GET() {
  try {
    const connection = await dbConnect(); // Connect to the database

    // Fetch packages along with activities and locations (including their IDs) using JOINs
    const [packages] = await connection.query<RowDataPacket[]>(
      `
      SELECT 
        p.id, 
        p.name, 
        p.price, 
        p.image_link, 
        p.\`index\`, 
        p.description,
        GROUP_CONCAT(DISTINCT CONCAT(pl.id, ':', pl.name)) AS locations,
        GROUP_CONCAT(DISTINCT CONCAT(pa.id, ':', pa.name)) AS activities
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

    // Transform the results to split `locations` and `activities` into arrays of objects with id and name
    const result = packages.map((pkg) => ({
      ...pkg,
      locations: pkg.locations
        ? pkg.locations.split(',').map((loc: string) => {
            const [id, name] = loc.split(':');
            return { id, name };
          })
        : [],
      activities: pkg.activities
        ? pkg.activities.split(',').map((act: string) => {
            const [id, name] = act.split(':');
            return { id, name };
          })
        : [],
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
