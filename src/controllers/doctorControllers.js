import doctorRepository from '../repositories/doctorRepository.js';
import doctorServices from '../services/doctorServices.js';

async function create(req, res, next) {
    try {
        const doctor = doctorServices.create(req.body);
        res.status(201).send(doctor);
    } catch (e){
        next(e);
    }
}

async function getAll(_, res, next) {
    try {
        const doctors = await doctorServices.getAll();
        res.status(200).send(doctors);
    } catch (e) {
        next(e);
    }
}

export default { create, getAll };