function unprocessableEntityError(message) {
	return {
		status: 422,
		name: "UnprocessableEntityError",
		message,
	};
}

function emailConflictError(email) {
	return {
		status: 409,
		name: "emailConflictError",
		message: "There is already an user with given email",
		email,
	};
}

function timeConflictError({ date, time }) {
	return {
		status: 409,
		name: "TimeConflictError",
		message: "There is already an appointment at this time",
		date,
		time,
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

function forbiddenError() {
	return {
		status: 403,
		name: "ForbiddenError",
		message: "You don't have permission to access this resource",
	};
}

export default {
	unprocessableEntityError,
	emailConflictError,
	unauthorizedError,
	notFoundError,
	invalidCredentialsError,
	badRequestError,
	timeConflictError,
	forbiddenError,
};
