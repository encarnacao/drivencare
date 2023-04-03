import errors from "../errors/index.js";
import authServices from "../services/authServices.js";

function signin(table) {
	return async (req, res, next) => {
		const { email, password } = req.body;
		if (!email || !password)
			throw errors.badRequestError("Email and password are required");
		try {
			const token = await authServices.signin(email, password, table);
			res.status(200).send({ token });
		} catch (e) {
			next(e);
		}
	};
}

function deleteAccount(table) {
	return async (_, res, next) => {
		const { email } = res.locals.user;
		if (!email) throw errors.unauthorizedError();
		try {
			await authServices.deleteAccount(email, table);
			res.sendStatus(204);
		} catch (e) {
			next(e);
		}
	};
}

export default { signin, deleteAccount };
