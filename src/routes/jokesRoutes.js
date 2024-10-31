const express = require("express");
const axios = require("axios");
const auth = require("../middleware/auth");
const { handleResponse, handleError } = require("../utils/responseHandler");
const { JOKE_SERVICE_MESSAGES } = require("../constants");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jokes
 *   description: Jokes management routes
 */

/**
 * @swagger
 * /moderateApi/jokes:
 *   get:
 *     summary: Retrieve all jokes
 *     tags: [Jokes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of jokes
 *       500:
 *         description: Error retrieving jokes
 */
router.get("/", auth, async (req, res) => {
  try {
    const response = await axios.get(process.env.SUBMIT_JOKES_URL);
    handleResponse(res, 200, response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:  JOKE_SERVICE_MESSAGES.FETCH_ERROR});
  }
});

/**
 * @swagger
 * /moderateApi/jokes:
 *   put:
 *     summary: Update a joke
 *     tags: [Jokes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Joke updated successfully
 *       500:
 *         description: Error updating joke
 */
router.put("/:id", auth, async (req, res) => {
  const { content, type } = req.body;
  try {
    await axios.put(`${process.env.SUBMIT_JOKES_URL}/${req.params.id}`, {
      content,
      type,
      isModerated: true,
    });
    handleResponse(res, 200, { message: JOKE_SERVICE_MESSAGES.UPDATE_SUCCESS });
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @swagger
 * /moderateApi/jokes:
 *   post:
 *     summary: Approve a joke
 *     tags: [Jokes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Joke approved successfully
 *       500:
 *         description: Error approving joke
 */
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
        message: JOKE_SERVICE_MESSAGES.APPROVE_SUCCESS,
      });
    }

    // Handle unexpected response status from delivery service
    handleResponse(res, deliveryResponse.status, {
      message:
        deliveryResponse?.data?.message ||
        JOKE_SERVICE_MESSAGES.APPROVE_ERROR,
    });
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * @swagger
 * /moderateApi/jokes:
 *   delete:
 *     summary: Delete a joke
 *     tags: [Jokes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Joke deleted successfully
 *       500:
 *         description: Error deleting joke
 */
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
