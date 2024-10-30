const express = require("express");
const axios = require("axios");
const auth = require("../middleware/auth");
const router = express.Router();

// Get unmoderated jokes
router.get("/", auth, async (req, res) => {
  try {
    const response = await axios.get(process.env.SUBMIT_JOKES_URL);
    res.json(response.data);
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
    });
    res.status(200).json({ message: "Joke updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating joke." });
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

    // Check if the joke was successfully delivered
    if (deliveryResponse.status === 200) {
      return res
        .status(200)
        .json({ message: "Joke approved and sent for delivery." });
    }

    // Handle unexpected response status
    res.status(deliveryResponse.status).json({
      message:
        deliveryResponse.data.message ||
        "Unexpected response from delivery service",
    });
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({
        message: error.response.data.message || "Error approving joke",
      });
    } else if (error.request) {
      return res.status(500).json({ message: "No response from the server" });
    } else {
      return res
        .status(500)
        .json({ message: error.message || "Unexpected error" });
    }
  }
});

// Delete joke
router.delete("/:id", auth, async (req, res) => {
  try {
    const response = await axios.delete(
      `${process.env.SUBMIT_JOKES_URL}/${req.params.id}`
    );

    if (response.status === 204) {
      return res.status(204).send();
    }

    res
      .status(response.status)
      .json({ message: response.data.message || "Unexpected response" });
  } catch (error) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.data.message || "Error occurred" });
    } else if (error.request) {
      return res.status(500).json({ message: "No response from the server" });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
