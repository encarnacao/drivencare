import database from "../config/database.js";

async function searchDoctorAppointments(doctorId, date) {
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

export default { searchDoctorAppointments, scheduleAppointment, checkConflict };
