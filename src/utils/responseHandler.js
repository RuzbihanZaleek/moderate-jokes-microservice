const { ERROR_MESSAGES } = require("../constants");

function handleResponse(res, status, data) {
  if (status >= 400) {
    return res
      .status(status)
      .json({ message: data.message || ERROR_MESSAGES.ERROR_OCCURRED });
  }
  return res.status(status).json(data);
}

function handleError(res, error) {
  if (error.response) {
    return res.status(error.response.status).json({
      message: error.response.data.message || ERROR_MESSAGES.ERROR_OCCURRED,
    });
  } else if (error.request) {
    return res.status(500).json({ message: ERROR_MESSAGES.NO_RESPONSE });
  } else {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  handleResponse,
  handleError,
};
