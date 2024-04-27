const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
app.use(express.json());

app.use(cors());

//Routes
app.use("/api", routes);

//database connection
const PORT = process.env.PORT || 3000;
mongoose.connect(
  "mongodb+srv://GabrielSan:jesuscre_123@spataskcalendar.c2htgug.mongodb.net/?retryWrites=true&w=majority&appName=SPATaskCalendar"
);

//Start the server
app.listen(PORT, () => {
  console.log("App running");
});
