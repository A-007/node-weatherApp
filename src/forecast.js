const request = require("request");

const forcast = (address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=b6199cfb88af7775777226a5047c1b14&query=" +
    address +
    "";
  request({ url: url, json: true }, (error, response) => {
    callback(response);
  });
};

module.exports = forcast;
