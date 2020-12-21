const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const debug = require("debug")("app");
const path = require("path");

const app = express();
app.use(morgan("tiny"));
app.set("views", "./src/views");
app.set("view engine", "ejs");

const nav = [
  { link: "/books", title: "Book" },
  { link: "/authors", title: "Author" },
];

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

const port = process.env.PORT || 3000;
const bookRouter = require("./src/routes/bookRoutes")(nav);
const adminRouter = require("./src/routes/adminRouter")(nav);

app.use("/books", bookRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.render("index", {
    nav,
    title: "Library",
  });
});

app.listen(3000, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
