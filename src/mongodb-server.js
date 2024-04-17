const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const corsOptions = {
  //local
  //origin: "http://localhost:80",
  //server
  origin: ["http://115.85.180.49", "http://localhost:5173"],
};

const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
//Set CORS option
app.use(cors(corsOptions));
//Parse req of content-type: application/json
app.use(bodyParser.json());
//Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//RESTful API route for DB
app.use("/", require("./app/mongodb/route/route.js"));

//DB connection
const db = require("./app/mongodb/model/index.js");
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("db.url :", db.url);
    console.log("db.mongoose :", db.mongoose);
    console.log("Database Connection Success");
  })
  .catch((err) => {
    console.log("DB connection failed :", err);
    process.exit();
  });

//Default route for server status
app.get("/", (req, res) => {
  res.json({
    message: `Server is running on port ${PORT}!`,
  });
});

// Set listen port for request
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
