const axios = require(`axios`);



let getMovies =  async (request, response, next) => {
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
};


class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.img = movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : '';
    this.id = movie.id;
  }
}


module.exports = getMovies;
