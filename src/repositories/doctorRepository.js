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

function getDoctors({ city, state, specialty, name }) {
	const params = [];
	let query = `
	SELECT id, name, specialty, city, state, registration FROM doctors
	WHERE 1 = 1 
	`;
	if (city) {
		query += `AND city ILIKE $${params.length + 1} || '%' `;
		params.push(city);
	}
	if (name) {
		query += `AND name ILIKE $${params.length + 1} || '%'`;
		params.push(name);
	}
	if (state) {
		query += `AND state ILIKE $${params.length + 1} `;
		params.push(state);
	}
	if (specialty) {
		query += `AND specialty ILIKE $${params.length + 1} `;
		params.push(specialty);
	}
	return database.query(query, params);
}

async function getDoctorByRegistration(registration) {
	const { row, rowCount } = await database.query(
		`SELECT * FROM doctors WHERE registration = $1`,
		[registration]
	);
	return { row, rowCount };
}

async function getScheduledAppointments(doctorId) {
	const { rows } = await database.query(
		`
		SELECT a.id, a.date, a.time, p.name AS patient_name, d.specialty as doctor_specialty, a.status
		FROM appointments a
		JOIN doctors d ON d.id = a.doctor_id
		JOIN patients p ON p.id = a.patient_id
		WHERE a.doctor_id = $1
		AND a.status <> 'canceled'
		AND a.date >= CURRENT_DATE
	`,
		[doctorId]
	);
	return rows;
}

async function getAppointmentHistory(doctorId) {
	const { rows } = await database.query(
		`
		SELECT a.id, a.date, a.time, p.name AS patient_name, d.specialty as doctor_specialty, a.status
		FROM appointments a
		JOIN doctors d ON d.id = a.doctor_id
		JOIN patients p ON p.id = a.patient_id
		WHERE a.doctor_id = $1
		AND a.date < CURRENT_DATE
		OR a.status = 'canceled'
	`,
		[doctorId]
	);
	return rows;
}

export default {
	createDoctor,
	getDoctors,
	getDoctorByRegistration,
	getScheduledAppointments,
	getAppointmentHistory,
};
