'use strict';

const express = require('express');

require('dotenv').config();

const cors = require('cors');


let data = require('./data/weather.json');


const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;


app.get('/', (req,res) => {
  res.send('hello');
});

app.get('/weather', (request, response, next) => {
  try {
    let cityQuery = request.query.city_name;
    console.log(cityQuery);
    let weatherObj = data.find(city => city.city_name.toLowerCase() === cityQuery.toLowerCase());
    console.log(weatherObj.data);
    let selectedCity = weatherObj.data.map(day => new Forecast(day));
    response.send(selectedCity);
  } catch(err) {
    next(err);
  }
});


app.get('*', (request, response) => {
  response.send('Route does not exists. Try Seattle, Paris or Amman.');
});


class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
    this.highTemp = day.max_temp;
    this.lowTemp = day.low_temp;
  }
}


app.listen(PORT, () => console.log(`listening on port ${PORT}`));
