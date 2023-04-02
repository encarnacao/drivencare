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

export default { getFreeAppoitments };
