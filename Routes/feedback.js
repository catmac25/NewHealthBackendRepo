const express = require("express");
const {getFeedback, addFeedback} = require("../Controllers/feedbackController");
const router = express.Router();

router.get('/:id', getFeedback);
router.post('/', addFeedback);

module.exports = router;