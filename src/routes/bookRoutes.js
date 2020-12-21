const express = require("express");

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route("/").get((req, res) => {
    res.render("bookList", {
      nav,
      title: "Library",
      books,
    });
  });

  bookRouter.route("/:id").get((req, res) => {
    const { id } = req.params;
    res.render("bookView", {
      nav,
      title: "Library",
      book: books[id],
    });
  });
  return bookRouter;
}

module.exports = router;