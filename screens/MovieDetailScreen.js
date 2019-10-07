import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

import ShowMovieDetails from '../components/ShowMovieDetails';

export default class MovieDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('movieTitle'),
      tabBarLabel: 'About this Movie',

      tabBarIcon: tabInfo => {
        return (
          <Ionicons
            name='ios-film'
            size={25}
            color={
              Platform.OS === 'android' ? Colors.primaryText : Colors.primary
            }
          />
        );
      }
    };
  };

  render() {
    const movieId = this.props.navigation.getParam('movieId');
    const lang = this.props.navigation.getParam('lang');

    return (
      <ShowMovieDetails
        navigation={this.props.navigation}
        movieId={movieId}
        lang={lang}
      />
    );
  }
}
