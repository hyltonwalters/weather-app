const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./../src/utils/geocode');

const app = express();

// Define path for Express config
const publicDirectoriesPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoriesPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Hylton Walters',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Hylton Walters',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Hylton Walters',
    helpText: 'This is some help text!',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'You must provide an address!' });
  }
  geocode(
    req.query.address,
    (error, { location, latitude, longitude, forecast } = {}) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast,
        location,
        // address: req.query.address,
        latitude,
        longitude,
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Hylton Walters',
    errorMsg: 'Help article not found!',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Hylton Walters',
    errorMsg: 'Page not found!',
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});
