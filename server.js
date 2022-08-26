'use strict';

const express = require('express');

require('dotenv').config();

const cors = require('cors');

const axios = require(`axios`);



const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;


app.get('/', (req,res) => {
  res.send('hello');
});

app.get('/weather', async (request, response, next) => {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=3&units=I`;
    let weatherObj = await axios.get(url);
    console.log(weatherObj.data);
    let selectedCity = weatherObj.data.data.map(day => new Forecast(day));
    response.send(selectedCity);
  } catch(err) {
    next(err);
  }
});


app.get('/movie', async (request, response, next) => {
  try {
    let city = request.query.city_name;
    let url = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIE_API_KEY}&title=${city}`;
    let weatherObj = await axios.get(url);
    console.log(weatherObj.data);
    let selectedCity = weatherObj.data.data.map(day => new Forecast(day));
    response.send(selectedCity);
  } catch(err) {
    next(err);
  }
});



app.get('*', (request, response) => {
  response.send('Route does not exists.');
});


// Error Handling Here
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send(err.message);
});


class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
    this.highTemp = day.max_temp;
    this.lowTemp = day.low_temp;
  }
}

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
  }
}


app.listen(PORT, () => console.log(`listening on port ${PORT}`));
