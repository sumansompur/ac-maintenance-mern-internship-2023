require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = 4000;

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Databse"));

app.use(express.json());
app.use(cors());

const users = require("./routes/users");
app.use("/api", users);

const appoints = require("./routes/appointments");
app.use("/api", appoints);

const contact = require("./routes/contactUs");
app.use("/api", contact);

app.listen(4000, () => {
  console.log("Express API is now running on port " + port + " !!");
});
