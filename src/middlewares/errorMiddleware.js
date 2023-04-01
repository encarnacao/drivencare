
export function handleApplicationErrors(err, req, res, next) {
  if (err.name === "ConflictError") {
    return res
      .status(err.status)
      .send({ message: err.message, email: err.email });
  }

  if (err.name === "InvalidCredentialsError") {
    return res.status(err.status).send({
      message: err.message,
    });
  }

  if (err.name === "UnprocessableEntityError") {
    return res.status(err.status).send({
      message: err.message,
    });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(err.status).send({
      message: err.message,
    });
  }

  if (err.name === "NotFoundError") {
    return res.status(err.status).send({
      message: err.message,
    });
  }

  return res.status(500).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}