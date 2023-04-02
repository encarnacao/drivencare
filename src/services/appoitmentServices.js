import appoitmentRepository from "../repositories/appoitmentRepository.js";

const TIMES = [
	"08:00",
	"08:30",
	"09:00",
	"09:30",
	"10:00",
	"10:30",
	"11:00",
	"11:30",
	"13:00",
	"13:30",
	"14:00",
	"14:30",
	"15:00",
	"15:30",
	"16:00",
	"16:30",
	"17:00",
];

async function getFreeAppoitments({ date, doctorId }) {
	const appointments = await appoitmentRepository.searchDoctorAppointments(
		doctorId,
		date
	);
	const appointmentTimes = appointments.map(
		(appointment) => appointment.time
	);
	const freeTimes = TIMES.filter((time) => !appointmentTimes.includes(time));
	return freeTimes;
}

export default { getFreeAppoitments };
