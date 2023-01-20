const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const MONGO_URL = "mongodb://127.0.0.1:27017/moviebox";
const PORT = 3000;
const app = express();
app.use(express.json());

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(PORT, (req, res) =>
  console.log(`Your server is running on port ${PORT}`)
);

let db;

const handleError = (res, error) => res.status(500).json({ error });

app.get("/movies", (req, res) => {
  const movies = [];
  db.collection("movies")
    .find()
    .sort({ title: 1 })
    .forEach((movie) => {
      return movies.push(movie);
    })
    .then(() => {
      res.status(200).json(movies);
    })
    .catch(() => {
      handleError(res, "Something went wrong...");
    });
});

app.get("/movies/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("movies")
      .findOne({ _id: ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch(() => {
        handleError(res, "Something went wrong...");
      });
  } else {
    handleError(res, "Wrong id");
  }
});

app.delete("/movies/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("movies")
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then(() => {
        res.status(200).json({ notification: "Item successfully deleted" });
      })
      .catch(() => {
        handleError(res, "Something went wrong...");
      });
  } else {
    handleError(res, "Wrong id");
  }
});

app.post("/movies", (req, res) => {
  db.collection("movies")
    .insertOne(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => {
      handleError(res, "Something went wrong...");
    });
});

app.patch("/movies/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("movies")
      .updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(() => {
        handleError(res, "Something went wrong...");
      });
  } else {
    handleError(res, "Wrong id");
  }
});
