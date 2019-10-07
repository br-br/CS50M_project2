import React, { Component } from 'react';
import { Platform } from 'react-native';
import Colors from '../constants/colors';
import PeopleProfile from '../components/PeopleProfile';
import { fetchBiography, fetchPersonMovies } from '../helpers/API';
import translations from '../helpers/translate';
import HeaderBackToTopButton from '../components/HeaderBackToTopButton';

export default class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    lang = navigation.getParam('lang');
    profile = translations[0][lang].PROFILE;
    return {
      headerStyle: {
        backgroundColor:
          Platform.OS === 'android' ? Colors.primaryText : Colors.primary,
        paddingTop: 0, // clears the default Header margin for the status bar
        height: 35, // sets new height for the Header
        marginTop: -15
      },

      headerTitleStyle: {
        fontFamily: 'quicksand-bold'
      },
      headerBackTitleStyle: {
        fontFamily: 'quicksand-reg'
      },
      headerTintColor:
        Platform.OS === 'android' ? Colors.primary : Colors.primaryText,

      headerTitle: profile + ' ' + navigation.getParam('name'),

      headerRight: <HeaderBackToTopButton navigation={navigation} />
    };
  };
  state = {
    id: 0,
    lang: '',
    name: '',
    movies: undefined,
    details: undefined
  };
  mounted = false;
  constructor(props) {
    super(props);
  }
  // getProfile = async (name, lang) => {
  //   if (!lang) {
  //     lang = 'en';
  //   }
  //   try {
  //     if (name) {
  //       let profile = await fetchProfile(name, lang);
  //       let result = [profile];
  //       // console.log('result in getProfile', result);
  //       return result[0];
  //     } else {
  //       return undefined;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  getPersonDetails = async (id, lang) => {
    if (!lang) {
      lang = 'en';
    }
    try {
      if (id) {
        let biography = await fetchBiography(id, lang);

        let result = [biography];
        // console.log('result in getBiography', result);
        return result[0];
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
    }
  };
  getPersonMovies = async (id, lang) => {
    if (!lang) {
      lang = 'en';
    }
    try {
      if (id) {
        let movies = await fetchPersonMovies(id, lang);

        let result = [movies];
        // console.log('result in getPersonMovies', result);
        return result[0];
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentWillMount() {
    const lang = this.props.lang;

    if (this.mounted) {
      this.setState({ lang: lang });
    }
  }
  componentDidMount() {
    this.mounted = true;
    const lang = this.props.navigation.getParam('lang');
    const name = this.props.navigation.getParam('name');
    const id = this.props.navigation.getParam('id');

    this.setState({ lang: lang, name: name, id: id });

    this.getPersonDetails(id, lang)
      .then(details => {
        if (this.mounted) {
          this.setState({ details: details });
        }
      })
      .catch(err => console.log('error in componentDidMount', err));

    this.getPersonMovies(id, lang)
      .then(movies => {
        const allMovies = movies['crew'].concat(movies['cast']);

        if (this.mounted) {
          this.setState({ movies: allMovies });
        }
      })
      .catch(err => console.log('error in componentDidMount', err));
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const lang = this.props.navigation.getParam('lang');
    const name = this.state.name;
    const details = this.state.details;
    const movies = this.state.movies;

    return this.state.details && this.state.movies ? (
      <PeopleProfile
        navigation={this.props.navigation}
        name={name}
        lang={lang}
        details={details}
        movies={movies}
      />
    ) : null;
  }
}
