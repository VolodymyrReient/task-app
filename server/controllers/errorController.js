const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;

  return new AppError(message, 400);
};

const handleDuplicateFiledsDB = (err) => {
  const value = err?.keyValue?.name || "";

  const message = `Duplicate field value: ${value}. Please use another value!`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res, next) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });

  next();
};

const sendErrorProd = (err, res, next) => {
  if (err?.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    next();
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
    next();
  }
};

module.exports = (err, req, res, next) => {
  const isDev = process.env.NODE_ENV === "development";

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (isDev) {
    sendErrorDev(err, res, next);
  } else {
    let error = { ...err };

    if (err.name === "CastError") {
      error = handleCastErrorDB(error);
    }
    if (err.code === 11000) {
      error = handleDuplicateFiledsDB(error);
    }

    if (err.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }

    sendErrorProd(error, res, next);
  }
};
