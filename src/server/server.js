const express = require("express");
const path = require("path");
//defining the port
const port = 8080;

//initializing an instance of our app
const app = express();

app.use(express.static("dist"));

//letting un know on which port we run the app
app.listen(port, () => console.log(`App running on prot ${port}`));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("/dist/index.html"));
});
