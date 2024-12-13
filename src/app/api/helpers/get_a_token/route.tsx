import { NextRequest } from 'next/server';
import { dbConnect } from '@/app/lib/db';
import { TOKEN_EXPIRE_TIME } from '@/app/lib/constants';
import { createHash } from 'crypto';
import { RowDataPacket } from 'mysql2'; // Import RowDataPacket to type the query result

async function generateToken(): Promise<string> {
  // Generate a random number between 10000 and 99999
  const randomNumber = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
  const dateTime = Date.now().toString(); // Get the current date and time (milliseconds)

  // Create a string using current date/time + random number
  const tokenString = `${dateTime}${randomNumber}`;

  // Generate a SHA-256 hash from the string
  return createHash('sha256').update(tokenString).digest('hex');
}

async function getEncryptedPassword(password: string): Promise<string> {
  const response = await fetch('http://localhost:3000/api/helpers/get_encrypted_password', {
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

    console.log('User:', rows);

    // The query result returns an array with user objects
    const userRecord = rows[0]; // Get the first user object from the result

    // Step 2: Get the encrypted password using the external API
    const encryptedPassword = await getEncryptedPassword(password);

    console.log("Encrypted Password: " + encryptedPassword);
    console.log("Database Password: " + userRecord.password);

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

    // Step 4: Generate the token and calculate expiration time
    const token = await generateToken();
    const expireTime = new Date(Date.now() + TOKEN_EXPIRE_TIME * 1000); // Add TOKEN_EXPIRE_TIME seconds

    // Step 5: Insert the token and expiration time into the database
    await connection.query(
      'UPDATE user SET token = ?, token_expire_date = ? WHERE name = ?',
      [token, expireTime, username]
    );

    return new Response(
      JSON.stringify({ token, expireTime }),
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
