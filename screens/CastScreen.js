import React, { Component } from 'react';
import { View, Text } from 'react-native';

import translater from '../helpers/translate';

import PeopleList from '../components/PeopleList';

export default class CastScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    lang: '',
    credits: []
  };
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const credits = this.props.navigation
      .dangerouslyGetParent()
      .getParam('credits');
    const lang = this.props.navigation.dangerouslyGetParent().getParam('lang');
    this.setState({ lang: lang, credits: credits });
  }

  render() {
    const listData = this.state.credits['cast'];
    const lang = this.state.lang;

    return (
      <View>
        <PeopleList
          lang={lang}
          listData={listData}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}
