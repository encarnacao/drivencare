export function handleApplicationErrors(err, req, res, next) {
	console.log(err);
	if (err.name) {
		const error = {	...err }
		delete error.status;
		return res.status(err.status).send(error);
	}
	return res.status(500).send({
		error: "Internal Server Error",
		message: err,
	});
}
