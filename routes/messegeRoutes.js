const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.post("/", messageController.postMessage);

router.put("/update", messageController.updateMessage);

router.delete("/delete", messageController.deleteMessage);

router.get("/user/:userId", messageController.getAllMessagesByUserId);

router.get("/channel/:channelId", messageController.getMessagesFromChannel);

module.exports = router;
