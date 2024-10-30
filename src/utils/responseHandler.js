function handleResponse(res, status, data) {
  if (status >= 400) {
    return res
      .status(status)
      .json({ message: data.message || "An error occurred" });
  }
  return res.status(status).json(data);
}

function handleError(res, error) {
  if (error.response) {
    return res.status(error.response.status).json({
      message: error.response.data.message || "Error occurred",
    });
  } else if (error.request) {
    return res.status(500).json({ message: "No response from the server" });
  } else {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  handleResponse,
  handleError,
};
