// app/api/db/route.tsx
import { dbConnect } from '@/app/lib/db';

export async function GET() {
    let connection;

    try {
        connection = await dbConnect(); // Connect to the database
        return new Response("Database connection successful!", {
            status: 200,
        });
    } catch (error) {
        console.error("Connection Error:", error);
        return new Response(
            `Database connection failed: ${(error as Error).message}`,
            {
                status: 500,
            }
        );
    } finally {
        if (connection) {
            await connection.end(); // Close the connection to prevent leaks
        }
    }
}
