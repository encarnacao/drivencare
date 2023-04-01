import bcrypt from 'bcrypt';
import patientRepository from '../repositories/patientRepository.js';

async function create(req, res, next) {
	const { name, email, password } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const patient = await patientRepository.createPatient(name, email, hashedPassword);
		res.status(201).send(patient[0]);
	} catch (e){
		next(e);
	}
}

export default { create };
