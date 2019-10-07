class Movie {
  constructor(
    id,
    title,
    year,
    rated,
    released,
    length,
    genre,
    director,
    writer,
    actors,
    plot,
    language,
    country,
    awards,
    poster,
    ratings,
    metascore,
    imdbRating,
    imdbVotes,
    imdbID,
    type,
    DVD,
    boxOffice,
    production,
    website,
    response
  ) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.rated = rated;
    this.released = released;
    this.length = length;
    this.genre = genre;
    this.director = director;
    this.writer = writer;
    this.actors = actors;
    this.plot = plot;
    this.language = language;
    this.country = country;
    this.awards = awards;
    this.poster = poster;
    this.ratings = ratings;
    this.metascore = metascore;
    this.imdbRating = imdbRating;
    this.imdbVotes = imdbVotes;
    this.imdbID = imdbID;
    this.type = type;
    this.DVD = DVD;
    this.boxOffice = boxOffice;
    this.production = production;
    this.website = website;
    this.response = response;
  }
}

export default Movie;
