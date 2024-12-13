// app/api/helpers/get_encrypted_password/route.tsx
import { NextRequest } from 'next/server';
import { createHash } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password) {
      return new Response(JSON.stringify({ error: 'Password is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Structure the password as adventure + password + tours
    const structuredPassword = `adventure${password}tours`;

    // Create SHA-256 hash of the structured password
    const encryptedPassword = createHash('sha256').update(structuredPassword).digest('hex');

    return new Response(JSON.stringify({ encryptedPassword }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
