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
    // Here you might implement the logic to edit the joke
    // For simplicity, assume we send the update back to the Submit Jokes Microservice
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
    await axios.post(process.env.DELIVER_JOKES_URL, joke);
    res.status(200).json({ message: "Joke approved and sent for delivery." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error approving joke." });
  }
});

// Delete joke
router.delete("/:id", auth, async (req, res) => {
  try {
    await axios.delete(`${process.env.SUBMIT_JOKES_URL}/${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting joke." });
  }
});

module.exports = router;
