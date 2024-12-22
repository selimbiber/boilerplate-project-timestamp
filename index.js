// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static("public"));

// Serve the main HTML file
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Function to check if the date is invalid
const isInvalidDate = (date) => date.toUTCString() === "Invalid Date";

// API endpoint for date parsing
app.get("/api/:date", function (req, res) {
  let date = new Date(req.params.date);

  // Check if the date is invalid
  if (isInvalidDate(date)) {
    // Try to parse the date as a Unix timestamp
    date = new Date(+req.params.date);
  }

  // Check again if the date is still invalid
  if (isInvalidDate(date)) {
    res.json({ error: "Invalid Date" });
    return;
  }

  // Return the valid date in JSON format
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// API endpoint for current date
app.get("/api", (req, res) => {
  const currentDate = new Date();
  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
