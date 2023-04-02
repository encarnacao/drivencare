import database from "../config/database.js";

async function searchAppointmentsByDate(doctorId, date) {
	const { rows } = await database.query(
		"SELECT id, date, time FROM appointments WHERE doctor_id = $1 AND date = $2",
		[doctorId, date]
	);
	return rows;
}

async function scheduleAppointment({ doctorId, patientId, date, time }) {
	const { rows } = await database.query(
		"INSERT INTO appointments (doctor_id, patient_id, date, time) VALUES ($1, $2, $3, $4) RETURNING id, date, time, status",
		[doctorId, patientId, date, time]
	);
	return rows;
}

async function checkConflict({ doctorId, date, time }) {
	const { rowCount } = await database.query(
		"SELECT id FROM appointments WHERE doctor_id = $1 AND date = $2 AND time = $3",
		[doctorId, date, time]
	);
	return rowCount;
}

async function getAppointmentById(appointmentId) {
	const { rows } = await database.query(
		"SELECT * FROM appointments WHERE id = $1",
		[appointmentId]
	);
	return rows[0];
}

async function updateAppointmentStatus(appointmentId, status) {
	const { rows } = await database.query(
		"UPDATE appointments SET status = $2 WHERE id = $1 RETURNING id, date, time, status",
		[appointmentId, status]
	);
	return rows;
}

export default {
	searchAppointmentsByDate,
	scheduleAppointment,
	checkConflict,
	updateAppointmentStatus,
	getAppointmentById,
};
