module.exports = (error, _req, res, _next) => {
  res.stauts(error.status || 500).json({ message: error.message });
};