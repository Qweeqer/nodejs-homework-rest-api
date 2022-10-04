const Messages = {
  400: "Missing required name field",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

const createError = (status, message = Messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = {
  createError,
};
