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
/*
@dec Listing all the files
*/
app.get("/files", async (req, res) => {
  let files = await gfs.files.find({}).toArray();
  if (!files?.length) return res.status(404).json({ message: "No files" });
  files = files.reduce((acc, current) => {
    current.isImage = current.contentType === "image/png" ? true : false;
    const x = acc.find((file) => file.filename === current.filename);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  return res.render("listingFiles", { files });
});
// media routes
app.get("/image/:filename", async (req, res) => {
  try {
    const lates = await gfs.files.findOne({ filename: req.params.filename });
    let latestVersion = await gfs.files
      .find({ filename: req.params.filename })
      .project({ _id: 1, contentType: 1 })
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    latestVersion = latestVersion[0];
    const readStream = gfs.createReadStream(latestVersion._id);
    readStream.pipe(res);
  } catch (error) {
    res.send("not found");
  }
});

app.delete("/file/:filename", async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("An error occured.");
  }
});

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
