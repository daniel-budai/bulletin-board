const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.get("/user/:userId", messageController.getAllMessagesByUserId);

router.post("/", messageController.postMessage);

router.put("/update", messageController.updateMessage);

router.delete("/delete", messageController.deleteMessage);

module.exports = router;
