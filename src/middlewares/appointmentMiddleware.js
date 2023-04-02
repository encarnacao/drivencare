import errors from "../errors/index.js";
import appoitmentRepository from "../repositories/appoitmentRepository.js";

async function checkConflict(req, _, next) {
	try {
		const conflict = await appoitmentRepository.checkConflict(req.params);
		if (conflict) throw errors.timeConflictError(req.params);
		next();
	} catch (e) {
		next(e);
	}
}

export default { checkConflict };
