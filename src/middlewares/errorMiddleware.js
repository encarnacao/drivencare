export function handleApplicationErrors(err, req, res, next) {
	let error = { ...err };
	if(err.file === 'enum.c'){
		error = { message: 'Invalid request'};
		err.status = 400;
	}
	delete error.status;
	if (!err.status) err.status = 500;
	return res.status(err.status).send(error);
}
