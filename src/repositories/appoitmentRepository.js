import database from "../config/database.js";

async function searchDoctorAppointments(doctorId, date) {
	const { rows } = await database.query(
		"SELECT id, date, time FROM appointments WHERE doctor_id = $1 AND date = $2",
		[doctorId, date]
	);
	return rows;
}

export default { searchDoctorAppointments };
