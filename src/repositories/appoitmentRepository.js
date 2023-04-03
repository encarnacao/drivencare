import database from "../config/database.js";

async function searchAppointmentsByDate(doctorId, date) {
	const { rows } = await database.query(
		"SELECT id, date, time FROM appointments WHERE doctor_id = $1 AND date = $2",
		[doctorId, date]
	);
	return rows;
}

async function searchFutureAppointments(doctorId) {
	const { rows } = await database.query(
		`
		SELECT
		s.date,
		CASE
		WHEN COUNT(a.id) = 0 THEN '[]'::json
		ELSE json_agg(json_build_object('id',a.id,'patient', p.name,'time', a.time, 'status', a.status))
	  	END AS appointments
	  	FROM
		generate_series(CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', '1 day') AS s(date)
  		LEFT JOIN appointments a ON a.doctor_id = $1 AND a.date = s.date
		LEFT JOIN patients p ON a.patient_id = p.id
	  	GROUP BY
		s.date
		ORDER BY
		s.date ASC;
	  `,
		[doctorId]
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

async function getTodayAppointments() {
	const { rows } = await database.query(`
		SELECT a.id, a.date, a.time, a.status, d.name AS doctor, 
		d.specialty AS doctor_specialty, p.name AS patient, p.email AS patient_email
		FROM appointments a
		JOIN doctors d ON a.doctor_id = d.id
		JOIN patients p ON a.patient_id = p.id
		WHERE a.date = CURRENT_DATE
		ORDER BY a.time ASC;
	`);
	return rows;
}

export default {
	searchAppointmentsByDate,
	scheduleAppointment,
	checkConflict,
	updateAppointmentStatus,
	getAppointmentById,
	searchFutureAppointments,
	getTodayAppointments
};
