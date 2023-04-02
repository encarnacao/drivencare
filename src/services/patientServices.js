import bcrypt from 'bcrypt';
import errors from '../errors/index.js';
import patientRepository from '../repositories/patientRepository.js';

async function create({ name, email, password }) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const patient = await patientRepository.createPatient(name, email, hashedPassword);
    return patient[0];
}

async function getAppointments(patientId) {
    const appointments = await patientRepository.getScheduledAppointments(patientId);
    if(appointments.length === 0) {
        throw errors.notFoundError();
    }
    return appointments;
}

async function getHistory(patientId) {
    const appointments = await patientRepository.getAppointmentHistory(patientId);
    if(appointments.length === 0) {
        throw errors.notFoundError();
    }
    return appointments;
}

export default { create, getAppointments, getHistory };