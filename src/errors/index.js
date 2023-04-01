function unprocessableEntityError(message) {
	return {
		status: 422,
		name: "UnprocessableEntityError",
		message,
	};
}

function conflictError(email) {
	return {
		status: 409,
		name: "ConflictError",
		message: "There is already an user with given email",
		email,
	};
}

function unauthorizedError() {
	return {
		status: 401,
		name: "UnauthorizedError",
		message: "You must be signed in to continue",
	};
}

function notFoundError() {
	return {
		status: 404,
		name: "NotFoundError",
		message: "No result for this search!",
	};
}

function invalidCredentialsError() {
	return {
		status: 401,
		name: "InvalidCredentialsError",
		message: "Email or password are incorrect",
	};
}

function badRequestError(message) {
	return {
		status: 400,
		name: "BadRequestError",
		message,
	};
}

export default {
	unprocessableEntityError,
	conflictError,
	unauthorizedError,
	notFoundError,
	invalidCredentialsError,
	badRequestError,
};
