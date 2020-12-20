const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const debug = require("debug")("app");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "/public/")));

app.use(
  "/css",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css"))
);

app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/jquery/dist"))
);

app.get("/", (req, res) => {
  res.render("index", {
    nav: [
      { link: "/books", title: "Books" },
      { link: "/authors", title: "Authors" },
    ],
    title: "Library",
  });
});

app.listen(3000, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
