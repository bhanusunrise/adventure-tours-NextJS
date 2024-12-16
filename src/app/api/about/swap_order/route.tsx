import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/db'; // Ensure this points to the correct database connection function
import mysql from 'mysql2/promise'; // Import mysql2 for executing queries with async/await

export async function POST(req: NextRequest) {
  let connection;
  try {
    const { firstId, secondId } = await req.json();

    // Establish the database connection
    connection = await dbConnect();

    // Get the current indexes of both items
    const [firstItems] = await connection.execute('SELECT * FROM about WHERE id = ?', [firstId]);
    const [secondItems] = await connection.execute('SELECT * FROM about WHERE id = ?', [secondId]);

    const firstItem = firstItems[0];
    const secondItem = secondItems[0];

    if (!firstItem || !secondItem) {
      return NextResponse.json({ message: 'Items not found' }, { status: 404 });
    }

    // Swap the indexes
    await connection.execute('UPDATE about SET `index` = ? WHERE id = ?', [secondItem.index, firstId]);
    await connection.execute('UPDATE about SET `index` = ? WHERE id = ?', [firstItem.index, secondId]);

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
