import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db'; // Ensure this points to the correct database connection function
import { RowDataPacket } from 'mysql2';

export async function POST(req: NextRequest) {
  let connection;
  try {
    const { firstId, secondId } = await req.json();

    // Establish the database connection
    connection = await dbConnect();

    // Get the current indexes of both destinations
    const [firstDestinations] = await connection.execute<RowDataPacket[]>('SELECT * FROM destinations WHERE id = ?', [firstId]);
    const [secondDestinations] = await connection.execute<RowDataPacket[]>('SELECT * FROM destinations WHERE id = ?', [secondId]);

    // Access the first destination and second destination from the result set
    const firstDestination = firstDestinations[0];
    const secondDestination = secondDestinations[0];

    if (!firstDestination || !secondDestination) {
      return NextResponse.json({ message: 'Destinations not found' }, { status: 404 });
    }

    // Swap the indexes
    await connection.execute('UPDATE destinations SET `index` = ? WHERE id = ?', [secondDestination.index, firstId]);
    await connection.execute('UPDATE destinations SET `index` = ? WHERE id = ?', [firstDestination.index, secondId]);

    return NextResponse.json({ message: 'Indexes swapped successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error swapping indexes:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
    // Close the connection if it was established
    if (connection) {
      await connection.end();
    }
  }
}
