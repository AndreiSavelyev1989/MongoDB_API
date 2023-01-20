const express = require("express");
const mongoose = require("mongoose");
const movieRoutes = require("./routes/movie-routes");

const MONGO_URL = "mongodb://127.0.0.1:27017/moviebox";
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(movieRoutes);

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(PORT, (req, res) =>
  console.log(`Your server is running on port ${PORT}`)
);
