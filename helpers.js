function handleError(res, err) {
  return res.status(500).send({ message: `${err.code} - ${err.message}` });
}

module.exports = handleError