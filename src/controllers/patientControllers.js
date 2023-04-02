import patientServices from "../services/patientServices.js";

async function create(req, res, next) {
	try {
		const patient = await patientServices.create(req.body);
		res.status(201).send(patient);
	} catch (e) {
		next(e);
	}
}

async function getAppointments(_, res, next) {
	try {
		const appointments = await patientServices.getAppointments(
			res.locals.user.id
		);
		res.status(200).send(appointments);
	} catch (e) {
		next(e);
	}
}

async function getHistory(_, res, next) {
	try {
		const appointments = await patientServices.getHistory(
			res.locals.user.id
		);
		res.status(200).send(appointments);
	} catch (e) {
		next(e);
	}
}

export default { create, getAppointments, getHistory };
