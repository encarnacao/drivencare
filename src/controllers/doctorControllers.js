import doctorServices from "../services/doctorServices.js";

async function create(req, res, next) {
	try {
		const doctor = await doctorServices.create(req.body);
		res.status(201).send(doctor);
	} catch (e) {
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

async function getAppointments(_, res, next) {
	try {
		const appointments = await doctorServices.getAppointments(
			res.locals.user.id
		);
		res.status(200).send(appointments);
	} catch (e) {
		next(e);
	}
}

async function getHistory(_, res, next) {
	try {
		const appointments = await doctorServices.getHistory(
			res.locals.user.id
		);
		res.status(200).send(appointments);
	} catch (e) {
		next(e);
	}
}

export default { create, get, getAppointments, getHistory };
