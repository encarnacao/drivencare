import database from "../config/database.js";

async function createDoctor(
	name,
	email,
	password,
	specialty,
	city,
	state,
	registration
) {
	const { rows } = await database.query(
		`INSERT INTO doctors (name, email, password, specialty, city, state, registration) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING id, name, email, specialty, city, state, registration, created_at`,
		[name, email, password, specialty, city, state, registration]
	);
	return rows;
}

function getAllDoctors() {
	return database.query(
		`SELECT id, name, specialty, city, state, registration FROM doctors`
	);
}

export default { createDoctor, getAllDoctors };
