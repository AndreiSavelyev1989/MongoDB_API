const { MongoClient } = require("mongodb");

const MONGO_URL = "mongodb://127.0.0.1:27017/moviebox";

let dbConnection;
module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(MONGO_URL)
      .then((client) => {
        console.log("Connected to MongoDB");
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => cb(err));
  },
  getDb: () => dbConnection,
};
