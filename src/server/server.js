const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const request = require("request");
const fetch = require("node-fetch");
const pixabayBase = "https://pixabay.com/api/?key=";

//defining the port
const port = 8080;
let travelData = {
  city: "",
  date: "",
  latitude: "",
  longitude: "",
  country: "",
  when: "",
  response: {},
  image: {}
};

//initializing an instance of our app
const app = express();

app.use(express.static("dist"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
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
  getWeather(latitude, longitude, travelData.when);
  getImage(city, country);
  res.send(travelData);
});
app.post("/travel-info-date", (req, res) => {
  travelData.when = req.body.when;
});

async function getWeather(latitude, longitude, when) {
  if (when == "this week") {
    const data = await fetch(
      `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${latitude},${longitude}`
    );
    const response = await data.json();
    const relevantData = response.daily.data[7];
    const { temperatureLow, temperatureHigh, summary } = relevantData;

    travelData.response = {
      low: `${((temperatureLow - 32) / 1.8).toFixed(1)} celsius`,
      high: `${((temperatureHigh - 32) / 1.8).toFixed(1)} celsius`,
      summary: summary
    };
  } else {
    const data = await fetch(
      `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${latitude},${longitude},${when}`
    );
    const response = await data.json();
    const relevantData = response.daily.data[0];
    const { temperatureLow, temperatureHigh, summary } = relevantData;
    travelData.response = {
      low: `${((temperatureLow - 32) / 1.8).toFixed(1)} celsius`,
      high: `${((temperatureHigh - 32) / 1.8).toFixed(1)} celsius`,
      summary: summary
    };
  }
}

async function getImage(city) {
  const text = `${city}+city`;
  const response = await fetch(
    `${pixabayBase}${process.env.PIXABAY_KEY}&q=${text}&image_type=photo`
  );
  const data = await response.json();
  const imageData = data.hits[0];
  if (imageData) {
    travelData.image = {
      imageLink: imageData.webformatURL
    };
  } else {
    travelData.image = {
      imageLink: "not found"
    };
  }
}
