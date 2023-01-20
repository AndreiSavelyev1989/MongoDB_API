const express = require("express");
const mongoose = require("mongoose");
const movieRoutes = require("./routes/movie-routes");
const dotenv = require("dotenv");

dotenv.config();

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(movieRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(PORT, (req, res) =>
  console.log(`Your server is running on port ${PORT}`)
);
