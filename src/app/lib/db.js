import mysql from 'mysql2/promise';

let connection;

export async function dbConnect() {


    const conString = {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE_NAME,
    };

    try {
        connection = await mysql.createConnection(conString);
        console.log("Newly Connected to MySQL");
        return connection;
    } catch (error) {
        console.error("Error connecting to MySQL:", error);
        throw new Error('Failed to connect to the database.');
    }
}
