const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const debug = require("debug")("app");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
app.use(morgan("tiny"));
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "library" }));

require("./src/config/passport")(app);

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
const adminRouter = require("./src/routes/adminRouter");
const authRouter = require("./src/routes/authRouter")(nav);

app.use("/books", bookRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.render("index", {
    nav,
    title: "Library",
  });
});

app.listen(3000, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
