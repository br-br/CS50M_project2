import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

import translater from '../helpers/translate';

import MovieList from '../components/MovieList';
import HeaderBackToTopButton from '../components/HeaderBackToTopButton';

export default class MoviesScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const lang = navigation.getParam('lang');
    const title = translater[0][lang].SHOW_MOVIES;
    const name = navigation.getParam('name');

    const backToTop = () => {
      navigation.reset(
        [
          NavigationActions.navigate({
            routeName: 'Search',
            params: { lang: lang }
          })
        ],
        0
      );
    };
    return {
      headerTitle: title + ' ' + name,
      headerRight: <HeaderBackToTopButton onPress={backToTop} />
    };
  };

  handleOnSelectMovie = (movie, navigation) => {
    const lang = this.props.navigation.getParam('lang');
    navigation.push('MovieDetail', {
      movieId: movie.id,
      movieTitle: movie.title,
      lang: lang
    });
  };

  render() {
    const movieList = this.props.navigation.getParam('movies');

    const movies = movieList.filter(movie => {
      return (
        (movie.character && movie.character.length > 0) ||
        (movie.job && movie.job.length > 0)
      );
    });

    return (
      <View style={this.styles.listContainer}>
        <MovieList
          movies={movies}
          navigation={this.props.navigation}
          onSelectMovie={this.handleOnSelectMovie}
        />
      </View>
    );
  }
  styles = StyleSheet.create({
    listContainer: {
      flex: 1,
      marginBottom: 0
    }
  });
}
