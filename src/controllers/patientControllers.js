import patientServices from "../services/patientServices.js";

async function create(req, res, next) {
	try {
		const patient = await patientServices.create(req.body);
		res.status(201).send(patient);
	} catch (e) {
		next(e);
	}
}

export default { create };
