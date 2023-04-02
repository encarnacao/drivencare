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

export default { signin };
