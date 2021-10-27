const express = require("express");
const connectDB = require("./config/connect");

const app = express();
require("dotenv").config();
// ********************************************************************************************
connectDB();
app.use(express.json());
// ********************************************************************************************
app.use("/api/contact/", require("./routes/contact"));
// ********************************************************************************************
const PORT = process.env.PORT;

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log("server is running", PORT)
);
