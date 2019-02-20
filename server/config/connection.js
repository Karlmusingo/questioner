/* eslint-disable indent */
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool;
if (process.env.DATABASE_URL) {
    const connectionString = process.env.DATABASE_URL;
    pool = new pg.Pool({
        connectionString,
    });
} else {
    const config = {
        user: process.env.PGUSER,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
    };
    pool = new pg.Pool(config);
}
export default pool;
