require("dotenv").config();
const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;
const express = require("express");
const app = express();
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const channelRoutes = require("./routes/channelRoutes");
const messageRoutes = require("./routes/messegeRoutes");

app.use(express.json());
app.use("/users", userRoutes);
app.use("/channels", channelRoutes);
app.use("/messages", messageRoutes);

app.listen(PORT, URL, () => {
  console.log(`listenting to http://${BASE_URL}:${PORT}`);
});
