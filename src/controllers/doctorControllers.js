import doctorServices from '../services/doctorServices.js';

async function create(req, res, next) {
    try {
        const doctor = await doctorServices.create(req.body);
        res.status(201).send(doctor);
    } catch (e){
        next(e);
    }
}

async function get(req, res, next) {
    try {
        const doctors = await doctorServices.get(req.query);
        res.status(200).send(doctors);
    } catch (e) {
        next(e);
    }
}

export default { create, get };