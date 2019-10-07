import React, { Component } from 'react';
import { fetchMovieDetails } from '../helpers/API';
import MovieDetail from './MovieDetail';

export default class ShowMovieDetails extends Component {
  state = {
    movie: [],
    movieId: 0,
    lang: undefined
  };
  mounted;

  getMovie = async (id, lang) => {
    if (!lang) {
      lang = 'en';
    }
    try {
      if (id) {
        let movie = await fetchMovieDetails(id, lang);
        let result = [movie];
        return result[0];
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
    }
  };
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const id = this.props.movieId;
    const lang = this.props.lang;

    this.getMovie(id, lang).then(currentMovie => {
      if (this.mounted) {
        this.setState({ movie: currentMovie, movieId: id, lang: lang });
      }
    });
  }
  componentDidMount = () => {
    this.mounted = true;
    const id = this.props.movieId;

    const lang = this.props.navigation.getParam('lang');

    this.setState({ lang: lang });

    this.getMovie(id, lang).then(currentMovie => {
      if (this.mounted) {
        this.setState({ movie: currentMovie, movieId: id, lang: lang });
      }
    });
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    // movieId will only be defined once the movie is loaded
    const movie = this.state.movie;
    const movieId = this.state.movie.id;

    const lang = this.state.lang;
    return movieId > 0 ? <MovieDetail movie={movie} lang={lang} /> : null;
  }
}
