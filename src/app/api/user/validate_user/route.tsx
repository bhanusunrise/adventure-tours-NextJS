import { NextRequest } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import { RowDataPacket } from 'mysql2'; // Import RowDataPacket for typing
import { BASE_URL } from '@/app/lib/constants';

async function getEncryptedPassword(password: string): Promise<string> {
  const response = await fetch(BASE_URL + 'api/helpers/get_encrypted_password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    throw new Error('Failed to hash password');
  }

  const data = await response.json();
  return data.encryptedPassword;
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: 'Username and password are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const connection = await dbConnect(); // Connect to the database

    // Step 1: Check if the user exists
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT * FROM user WHERE name = ?',
      [username]
    );

    if (!rows || rows.length === 0) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // The query result returns an array with user objects
    const userRecord = rows[0]; // Get the first user object from the result

    // Step 2: Get the encrypted password using the external API
    const encryptedPassword = await getEncryptedPassword(password);

    // Step 3: Verify the password
    if (userRecord.password !== encryptedPassword) {
      return new Response(
        JSON.stringify({ error: 'Invalid password' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // If the password is correct, return success
    return new Response(
      JSON.stringify({ message: 'User validated successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
