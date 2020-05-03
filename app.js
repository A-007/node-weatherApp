const express = require("express");
const path = require("path");
const hbs = require("hbs");

const forecast = require("./src/forecast");

const port = process.env.PORT || 3000;

// __dirname, __filename

const app = express();
console.log(__dirname);
const publicPathDirectory = path.join(__dirname, "/public");
console.log(publicPathDirectory);
const viewPath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");
console.log(partialsPath);

// app.use() is a way to customize the webserver
// setup static directory to serve
app.use(express.static(publicPathDirectory));

// setup handlebar engine and views
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  // res.send("Hello Express!");
  res.render("index", {
    title: "Weather App",
    name: "Akshay Patil",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Akshay",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helptext: "This is some helpful text",
    title: "Help",
    name: "Akshay",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  forecast(req.query.address, (response) => {
    res.send({
      forcast:
        response.body.current.weather_descriptions[0] +
        " .It is currently " +
        response.body.current.temperature +
        ". But it feels like " +
        response.body.current.feelslike,
      location: response.body.location.name,
      Address: req.query.address,
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Help error page",
    errorMsg: "Help Document not found",
    name: "Akshay",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error Page",
    errorMsg: "404 Page not found",
    name: "Akshay",
  });
});

app.listen(port, () => {
  console.log("server is up on port " + port);
});
