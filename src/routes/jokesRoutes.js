const express = require("express");
const axios = require("axios");
const auth = require("../middleware/auth");
const { handleResponse, handleError } = require("../utils/responseHandler");
const router = express.Router();

// Get jokes
router.get("/", auth, async (req, res) => {
  try {
    const response = await axios.get(process.env.SUBMIT_JOKES_URL);
    handleResponse(res, 200, response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving jokes." });
  }
});

// update joke
router.put("/:id", auth, async (req, res) => {
  const { content, type } = req.body;
  try {
    await axios.put(`${process.env.SUBMIT_JOKES_URL}/${req.params.id}`, {
      content,
      type,
      isModerated: true,
    });
    handleResponse(res, 200, { message: "Joke updated successfully." });
  } catch (error) {
    handleError(res, error);
  }
});

// Approve joke
router.post("/approve/:id", auth, async (req, res) => {
  const joke = req.body;

  try {
    const deliveryResponse = await axios.post(
      process.env.DELIVER_JOKES_URL,
      joke
    );

    // If the delivery was successful, delete the joke from submitted joke list.
    if (deliveryResponse) {
      await axios.delete(`${process.env.SUBMIT_JOKES_URL}/${req.params.id}`);

      // Send response indicating success
      return handleResponse(res, 200, {
        message: "Joke approved successfully",
      });
    }

    // Handle unexpected response status from delivery service
    handleResponse(res, deliveryResponse.status, {
      message:
        deliveryResponse?.data?.message ||
        "Unexpected response from delivery service",
    });
  } catch (error) {
    handleError(res, error);
  }
});

// Delete joke
router.delete("/:id", auth, async (req, res) => {
  try {
    const response = await axios.delete(
      `${process.env.SUBMIT_JOKES_URL}/${req.params.id}`
    );

    handleResponse(res, response.status, {});
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
