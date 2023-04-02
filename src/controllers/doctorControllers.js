import bcrypt from 'bcrypt';
import doctorRepository from '../repositories/doctorRepository.js';

async function create(req, res, next) {
    const { name, email, password, specialty, city, state, registration } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const doctor = await doctorRepository.createDoctor(name, email, hashedPassword, specialty, city, state, registration);
        res.status(201).send(doctor[0]);
    } catch (e){
        next(e);
    }
}

export default { create };