const express = require("express");
const router = express.Router();
const {
  createChannel,
  getChannels,
  updateChannel,
  deleteChannel,
} = require("../controllers/channelController");

router.post("/", createChannel);
router.get("/", getChannels);
router.put("/", updateChannel);
router.delete("/", deleteChannel);

module.exports = router;
