module.exports = (error, req, res) => {
  const status = error.statusCode || 500;
  const { message } = error;
  const { data } = error;
  const { validation } = error;
  res.status(status).json({
    message,
    data,
    validation,
  });
};
