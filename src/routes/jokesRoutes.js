const express = require("express");
const axios = require("axios");
const auth = require("../middleware/auth");
const { handleResponse, handleError } = require("../utils/responseHandler");
const router = express.Router();

// Get unmoderated jokes
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
  try {
    const jokeResponse = await axios.get(
      `${process.env.SUBMIT_JOKES_URL}/${req.params.id}`
    );
    const joke = jokeResponse.data;
    const deliveryResponse = await axios.post(
      process.env.DELIVER_JOKES_URL,
      joke
    );

    handleResponse(res, deliveryResponse.status, {
      message: "Joke approved and sent for delivery.",
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
