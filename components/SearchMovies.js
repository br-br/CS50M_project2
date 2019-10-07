import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { fetchMovieList } from '../helpers/API';
import MovieList from './MovieList';
import Colors from '../constants/colors';
import translater from '../helpers/translate';

class SearchMovies extends Component {
  state = {
    searchText: '',
    movies: [],
    lang: ''
  };
  mounted;
  removeDuplicates = (array, key) => {
    let lookup = {};
    let result = [];
    array.forEach(element => {
      if (!lookup[element[key]]) {
        lookup[element[key]] = true;
        result.push(element);
      }
    });
    return result;
  };

  getMovieList = async (query, page, lang) => {
    try {
      if (query != '') {
        let movieList = await fetchMovieList(query, page, lang);

        let result = [...movieList.results];
        result = this.removeDuplicates(result, 'id');
        this.setState({ movies: result });
      } else {
        this.setState({ movies: [] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleOnSelectMovie = (movie, navigation) => {
    const lang = this.props.navigation.getParam('lang');
    navigation.push('MovieDetail', {
      movieId: movie.id,
      movieTitle: movie.title,
      lang: lang
    });
  };
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if (this.mounted) {
      this.setState({ searchText: '', movies: [] });
    }
  }
  componentDidMount = () => {
    this.mounted = true;
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { movies, searchText } = this.state;
    const lang = this.props.navigation.getParam('lang');
    const local = translater[0][lang];

    return (
      <View style={styles.searchScreen}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputTextBox}
            onChangeText={searchText => {
              this.setState({ searchText: searchText });
              this.getMovieList(searchText, 1, lang);
            }}
            value={searchText}
            placeholder={local.SEARCH_PROMPT}
          />
        </View>
        <View style={styles.listContainer}>
          {this.state.searchText !== '' ? (
            <MovieList
              movies={movies}
              onSelectMovie={this.handleOnSelectMovie}
            />
          ) : (
            <Text style={styles.message}>{local.SEARCH_MESSAGE}</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  inputTextBox: {
    height: 35,
    padding: 10,
    flex: 1,
    borderColor: 'transparent',
    borderBottomColor: Colors.secondary,
    borderWidth: 2
  },
  listContainer: {
    marginBottom: 175
  },
  message: {
    width: '90%',
    textAlign: 'center'
  }
});
export default withNavigation(SearchMovies);
