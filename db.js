const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

let dbConnection;
module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(process.env.MONGO_URL)
      .then((client) => {
        console.log("Connected to MongoDB");
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => cb(err));
  },
  getDb: () => dbConnection,
};
