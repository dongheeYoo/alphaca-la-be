const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:8080",
};

app.use(express.static("public"));
//Set CORS option
app.use(cors(corsOptions));
//Parse req of content-type: application/json
app.use(bodyParser.json());
// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.error(e));

app.listen(8080, () => {
  console.log("실행중");
});

app.get("/", (req, res) => {
  res.send("hello world2");
});
