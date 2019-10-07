import React, { Component } from 'react';
import { View } from 'react-native';
import HeaderSettingsButton from '../components/HeaderSettingsButton';
import translater from '../helpers/translate';

import SearchMovies from '../components/SearchMovies';

export default class SearchScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const lang = navigation.getParam('lang');
    const searchTitle = translater[0][lang].SEARCH_TITLE;
    const title = translater[0][lang].SETTINGS;
    return {
      headerTitle: searchTitle,
      headerRight: (
        <HeaderSettingsButton
          onPress={() => navigation.navigate('Settings', { lang, title })}
        />
      )
    };
  };

  render() {
    return (
      <View>
        <SearchMovies navigation={this.props.navigation} />
      </View>
    );
  }
}
