const axios = require(`axios`);



let getWeather =  async (request, response, next) => {
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
};


class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
    this.highTemp = day.max_temp;
    this.lowTemp = day.low_temp;
  }
}

module.exports = getWeather;
