import errors from "../errors/index.js";
import doctorRepository from "../repositories/doctorRepository.js";

async function checkConflict(req, _, next) {
	try {
		const { registration } = req.body;
		const { rowCount: conflict } =
			await doctorRepository.getDoctorByRegistration(registration);
		if (conflict) throw errors.registrationConflictError(registration);
		next();
	} catch (e) {
		next(e);
	}
}

export default { checkConflict };
