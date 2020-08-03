const request = require('request');

const geocode = (address, callback) => {
  const url =
    'http://api.weatherapi.com/v1/current.json?key=7da12855a2194f26bf6134914203107&q=' +
    address;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location service!', undefined);
    } else if (body.current === undefined) {
      callback('Unable to find location. Try another search!', undefined);
    } else {
      callback(undefined, {
        latitude: body.location.lat,
        longitude: body.location.lon,
        location: body.location.name,
        forecast: `${body.current.condition.text}. It is currently ${body.current.temp_c} degrees out. There is a ${body.current.precip_in}% change of rain.`,
      });
    }
  });
};

module.exports = geocode;
