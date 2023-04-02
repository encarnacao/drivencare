import bcrypt from 'bcrypt';
import patientRepository from '../repositories/patientRepository.js';

async function create({ name, email, password }) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const patient = await patientRepository.createPatient(name, email, hashedPassword);
    return patient[0];
}

export default { create };