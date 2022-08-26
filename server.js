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
    response.status(200).send(selectedCity);
  } catch(err) {
    next(err);
  }
});


app.get('/movie', async (request, response, next) => {
  try {
    let title = request.query.title;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${title}`;
    let movieObj = await axios.get(url);
    console.log(movieObj.data);
    let selectedCity = movieObj.data.results.map(movie => new Movie(movie));
    response.status(200).send(selectedCity);
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
    this.imgPath = movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : '';
    this.id = movie.id;
  }
}


app.listen(PORT, () => console.log(`listening on port ${PORT}`));
