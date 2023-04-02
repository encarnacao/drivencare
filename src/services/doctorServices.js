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

export default { create, get };
