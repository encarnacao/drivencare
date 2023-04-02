import appoitmentServices from "../services/appoitmentServices.js";

async function getFreeAppoitments(req, res, next) {
	try {
		const freeAppoitments = await appoitmentServices.getFreeAppoitments(
			req.params
		);
		res.status(200).send(freeAppoitments);
	} catch (e) {
		next(e);
	}
}

async function scheduleAppointment(req, res, next) {
	try {
		const patientId = res.locals.user.id;
		const appointment = await appoitmentServices.scheduleAppointment({
			...req.params,
			patientId,
		});
		res.status(201).send(appointment);
	} catch (e) {
		next(e);
	}
}

async function updateAppointmentStatus(req, res, next) {
	try {
		const appointment = await appoitmentServices.updateAppointmentStatus(
			req.params
		);
		res.status(200).send(appointment);
	} catch (e) {
		next(e);
	}
}

async function getFutureFreeTimes(req, res, next) {
	try {
		const available = await appoitmentServices.getFutureFreeTimes(
			req.params
		);
		res.status(200).send(available);
	} catch (e) {
		next(e);
	}
}

export default {
	getFreeAppoitments,
	scheduleAppointment,
	updateAppointmentStatus,
	getFutureFreeTimes,
};
