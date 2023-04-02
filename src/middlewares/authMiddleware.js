import errors from "../errors/index.js";
import authRepository from "../repositories/authRepository.js";
import jwt from "jsonwebtoken";

function checkConflicts(table) {
	return async (req, _, next) => {
		const { email } = req.body;
		try {
			const user = await authRepository.searchEmail(email, table);
			if (user.length > 0) {
				throw errors.emailConflictError(email);
			}
		} catch (e) {
			next(e);
		}
		next();
	};
}

function validateCredentials(table) {
	return async (req, res, next) => {
		const token = req.headers.authorization?.replace("Bearer ", "");
		if (!token) throw errors.unauthorizedError();
		try {
			const { email } = jwt.verify(token, process.env.JWT_SECRET);
			const user = await authRepository.searchEmail(email, table);
			if (user.length === 0) throw errors.unauthorizedError();
			res.locals.user = user[0];
		} catch (e) {
			next(e);
		}
		next();
	};
}

export default { checkConflicts, validateCredentials };
