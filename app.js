const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./Routes/Users.routes");
const waterRoutes = require("./Routes/WaterControllers.routes");
require("./Connection/db");
require("dotenv").config();
const auth = require("./helpers/auth");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});

app.get("/ping", (req, res, next) => {
  res.status(200).send({ status: true, message: "PONG!" });
});
app.get("/private", auth, (req, res, next) => {
  res.send({
    status: true,
    message: "this is a private route and can be accessed with token",
  });
});

app.use("/user", userRoutes);
app.use("/water", waterRoutes);
