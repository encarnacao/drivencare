import bcrypt from "bcrypt";
import doctorRepository from "../repositories/doctorRepository.js";
import errors from "../errors/index.js";

async function create({
	name,
	email,
	password,
	specialty,
	city,
	state,
	registration,
}) {
	const hashedPassword = await bcrypt.hash(password, 10);
	const doctor = await doctorRepository.createDoctor(
		name,
		email,
		hashedPassword,
		specialty,
		city,
		state,
		registration
	);
	return doctor[0];
}

async function get({ city, state, specialty, name }) {
	const { rows: doctors, rowCount } = await doctorRepository.getDoctors({
		city,
		state,
		specialty,
		name,
	});
	if (!rowCount) throw errors.notFoundError();
	return doctors;
}

async function getAppointments(doctorId) {
	const appointments = await doctorRepository.getScheduledAppointments(
		doctorId
	);
	if (appointments.length === 0) {
		throw errors.notFoundError();
	}
	return appointments;
}

async function getHistory(doctorId) {
	const appointments = await doctorRepository.getAppointmentHistory(doctorId);
	if (appointments.length === 0) {
		throw errors.notFoundError();
	}
	return appointments;
}

export default { create, get, getAppointments, getHistory };
