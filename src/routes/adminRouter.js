const express = require("express");
const { MongoClient } = require("mongodb");
const debug = require("debug")("app:bookRoutes");

const adminRouter = express.Router();
const books = [
  {
    title: "Harry Potter",
    genre: "Fiction",
    author: "JK Rowling",
    read: false,
  },
  {
    title: "Romeo and Juliet",
    genre: "Fiction",
    author: "Shakespeare",
    read: false,
  },
];

function router() {
  adminRouter.route("/").get((req, res) => {
    const url = "mongodb://localhost:27017";
    const dbName = "libraryApp";

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug("Connected to server");

        const db = client.db(dbName);

        const response = await db.collection("books").insertMany(books);
        res.json(response);
      } catch (err) {
        debug(err);
      }
      client.close();
    })();
  });
  return adminRouter;
}

module.exports = router;
