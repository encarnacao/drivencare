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

async function getAll() {
	const { rows: doctors, rowCount } = await doctorRepository.getAllDoctors();
	if (!rowCount) throw errors.notFoundError();
	return doctors;
}

export default { create, getAll };
