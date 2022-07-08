require("dotenv").config();
const upload = require("./routes/upload");
const Grid = require("gridfs-stream");
const path = require("path");
const mongoose = require("mongoose");
const connection = require("./db");
const express = require("express");
const { async } = require("q");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method")); //we want to use the query string
app.use(express.static(path.join(__dirname, "public")));
let gfs;
connection();

const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

app.use("/file", upload);
app.get("/", (req, res) => {
  return res.render("index", { title: "Express" });
});

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
