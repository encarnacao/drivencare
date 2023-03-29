import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const config = {
	connectionString: process.env.DATABASE_URL,
	...(process.env.NODE_ENV === "production" && {
		ssl: {
			rejectUnauthorized: false,
		},
	}),
};

const connectionDb = new Pool(config);

export default connectionDb;
