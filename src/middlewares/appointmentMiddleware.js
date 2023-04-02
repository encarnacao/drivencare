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

async function checkStatus(req, _, next) {
	try {
		const { status } = req.params;
		if (status !== "confirmed" && status !== "canceled")
			throw errors.badRequestError("Invalid status");
		next();
	} catch (e) {
		next(e);
	}
}

async function checkAppointment(req, res, next) {
	try {
		const { id } = res.locals.user;
		const appointment = await appoitmentRepository.getAppointmentById(
			req.params.appointmentId
		);
		if (!appointment) throw errors.notFoundError();
		if (appointment.doctor_id !== id) throw errors.forbiddenError();
		next();
	} catch (e) {
		next(e);
	}
}

export default { checkConflict, checkStatus, checkAppointment };
