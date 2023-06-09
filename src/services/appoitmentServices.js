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
	const appointments = await appoitmentRepository.searchAppointmentsByDate(
		doctorId,
		date
	);
	const appointmentTimes = appointments.map(
		(appointment) => appointment.time
	);
	const freeTimes = TIMES.filter((time) => !appointmentTimes.includes(time));
	return freeTimes;
}

async function scheduleAppointment({ doctorId, patientId, date, time }) {
	const appointment = await appoitmentRepository.scheduleAppointment({
		doctorId,
		patientId,
		date,
		time,
	});
	return appointment;
}

async function updateAppointmentStatus({ appointmentId, status }) {
	const appointment = await appoitmentRepository.updateAppointmentStatus(
		appointmentId,
		status
	);
	return appointment;
}

async function getFutureFreeTimes({ doctorId }) {
	const appointments = await appoitmentRepository.searchFutureAppointments(
		doctorId
	);
	const available = appointments.map((appointment) => {
		const freeTimes = TIMES.filter(
			(time) =>
				!appointment.appointments
					.map((appointment) => appointment.time)
					.includes(time)
		);
		return {
			date: appointment.date,
			freeTimes,
		};
	});
	return available;
}

export default {
	getFreeAppoitments,
	scheduleAppointment,
	updateAppointmentStatus,
	getFutureFreeTimes
};
