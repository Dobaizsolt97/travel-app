const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

//defining the port
const port = 8080;
let travelData = {
  city: "",
  date: "",
  latitude: "",
  longitude: "",
  country: ""
};

//initializing an instance of our app
const app = express();

app.use(express.static("dist"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//letting un know on which port we run the app
app.listen(port, () => console.log(`App running on prot ${port}`));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("/dist/index.html"));
});

app.get("/travel-info", (req, res) => {
  res.send(travelData);
});

app.post("/travel-info", (req, res) => {
  const { city, date, country, latitude, longitude } = req.body;
  travelData.city = city;
  travelData.date = date;
  travelData.country = country;
  travelData.latitude = latitude;
  travelData.longitude = longitude;
  res.send("added");
});
