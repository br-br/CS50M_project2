import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import RadioButton from '../components/RadioButton';
import translations from '../helpers/translate';
import Colors from '../constants/colors';

export default class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title')
      ? navigation.getParam('title')
      : 'Settings';

    return {
      headerTitle: title
    };
  };
  state = {
    lang: undefined,
    title: 'Settings',
    radioItems: [
      {
        value: 'en',
        label: 'English',
        selected: false
      },

      {
        value: 'de',
        label: 'Deutsch',
        selected: false
      },

      {
        value: 'fr',
        label: 'Français',
        selected: false
      }
    ],
    selectedItem: '',
    selectedLang: ''
  };
  mounted = false;
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const lang = this.props.lang;

    if (this.mounted) {
      this.setState({ lang: lang });
    }
  }
  componentDidMount() {
    this.mounted = true;
    if (this.mounted) {
      this.setState({ lang: this.props.lang });
      this.state.radioItems.map(item => {
        if (item.selected == true) {
          this.setState({ selectedItem: item.label, lang: item.value });
        }
      });
      const lang = this.props.navigation.getParam('lang');
      this.state.radioItems.map((item, index) => {
        if (item.value === lang) {
          updatedRadioItems = [...this.state.radioItems];
          updatedRadioItems[index].selected = true;
          this.setState({ radioItems: updatedRadioItems });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }
  changeActiveLanguage(index) {
    this.state.radioItems.map(item => {
      item.selected = false;
    });

    this.state.radioItems[index].selected = true;

    this.setState({ radioItems: this.state.radioItems }, () => {
      this.setState({ selectedItem: this.state.radioItems[index].label });
    });
    this.setState({ lang: this.state.radioItems[index].value });
  }
  applyLanguageChange = () => {
    newLang = this.state.lang;
    if (newLang) {
      this.props.navigation.navigate('Search', {
        lang: newLang
      });
    } else {
      this.props.navigation.navigate('Search');
    }
  };

  render() {
    const lang = this.state.lang ? this.state.lang : 'en';
    const local = translations[0][lang];

    return (
      <View style={styles.settingsContainer}>
        <Text style={styles.headerText}>{local.CHOOSE_LANG}</Text>

        <View style={styles.radioContainer}>
          {this.state.radioItems.map((item, key) => (
            <RadioButton
              key={key}
              button={item}
              onClick={this.changeActiveLanguage.bind(this, key)}
              size={28}
            />
          ))}
          {/* <View style={styles.selectedTextContainer}>
            <Text style={styles.selectedText}>
              Active Language: {this.state.selectedItem}
            </Text>
          </View> */}
        </View>

        <View style={styles.applyBtn}>
          <Button
            color={Colors.secondary}
            title={local.APPLY}
            onPress={this.applyLanguageChange}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  settingsContainer: {
    // flex: 1,
    height: 300,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 50
  },

  headerText: {
    fontFamily: 'architects-daughter',
    fontSize: 22,
    textAlign: 'center'
  },
  RadioContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: 20
  },
  selectedTextContainer: {
    padding: 20,
    backgroundColor: 'plum',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  selectedText: {
    fontSize: 18,
    color: 'white'
  },
  applyBtn: {
    padding: 10,
    width: '80%',
    borderRadius: 25
  }
});
