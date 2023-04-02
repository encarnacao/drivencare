import database from "../config/database.js";

async function createPatient(name, email, password) {
	const { rows } = await database.query(
		`INSERT INTO patients (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at`,
		[name, email, password]
	);
	return rows;
}

async function getScheduledAppointments(patientId) {
	const { rows } = await database.query(
		`
		SELECT a.id, a.date, a.time, d.name AS doctor_name, d.specialty as doctor_specialty, a.status
		FROM appointments a
		JOIN doctors d ON d.id = a.doctor_id
		WHERE a.patient_id = $1
		AND a.status <> 'canceled'
		AND a.date >= CURRENT_DATE
	`,
		[patientId]
	);
	return rows;
}

async function getAppointmentHistory(patientId) {
	const { rows } = await database.query(
		`
		SELECT a.id, a.date, a.time, d.name AS doctor_name, d.specialty as doctor_specialty, a.status
		FROM appointments a
		JOIN doctors d ON d.id = a.doctor_id
		WHERE a.patient_id = $1
		AND a.date < CURRENT_DATE
		OR a.status = 'canceled'
	`,
		[patientId]
	);
	return rows;
}

export default {
	createPatient,
	getScheduledAppointments,
	getAppointmentHistory,
};
