import { Pool } from "pg";

console.log("Database URL:", process.env.DATABASE_URL);

export const db = new Pool({
    connectionString: process.env.DATABASE_URL,
});
