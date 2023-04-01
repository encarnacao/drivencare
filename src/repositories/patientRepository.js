import database from "../config/database.js";

async function createPatient(name, email, password) {
	const { rows } = await database.query(
		`INSERT INTO patients (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at`,
		[name, email, password]
	);
	return rows;
}

export default { createPatient };
