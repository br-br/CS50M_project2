import React from 'react';
import { Platform } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  NavigationActions
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/colors';
import SearchScreen from '../screens/SearchScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import MoviesScreen from '../screens/MoviesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CastScreen from '../screens/CastScreen';
import CrewScreen from '../screens/CrewScreen';
import ProfileScreen from '../screens/ProfileScreen';
import translate from '../helpers/translate';
import HeaderBackToTopButton from '../components/HeaderBackToTopButton';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor:
      Platform.OS === 'android' ? Colors.primary : Colors.primary.Text
  },
  headerTitleStyle: {
    fontFamily: 'quicksand-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'quicksand-reg'
  },
  headerTintColor:
    Platform.OS === 'android' ? Colors.primaryText : Colors.primary,

  headerTitle: null
};

const CastNavigator = createStackNavigator(
  {
    Cast: CastScreen,
    Profile: ProfileScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
    initialRouteName: 'Cast'
  }
);

const CrewNavigator = createStackNavigator(
  {
    Crew: CrewScreen,
    Profile: ProfileScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
    initialRouteName: 'Crew'
  }
);

const CreditsTabNavigator = createBottomTabNavigator(
  {
    Cast: {
      screen: CastNavigator,
      navigationOptions: {
        tabBarLabel: '...',
        tabBarIcon: () => (
          <Ionicons
            name='ios-people'
            color={
              Platform.OS === 'android' ? Colors.primaryText : Colors.primary
            }
            size={25}
          />
        )
      }
    },
    Crew: {
      screen: CrewNavigator,
      navigationOptions: {
        tabBarLabel: '...',
        tabBarIcon: () => (
          <Ionicons
            name='ios-videocam'
            color={
              Platform.OS === 'android' ? Colors.primaryText : Colors.primary
            }
            size={25}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor:
        Platform.OS === 'android' ? Colors.primaryText : Colors.primary,
      activeBackgroundColor:
        Platform.OS === 'android' ? Colors.primary : Colors.primary.Text,
      inactiveTintColor:
        Platform.OS === 'android' ? Colors.secondaryText : Colors.secondary,
      inactiveBackgroundColor:
        Platform.OS === 'android' ? Colors.secondary : Colors.secondary.Text,
      showLabel: false,
      showIcon: true
    },

    initialRouteName: 'Cast'
  }
);

CreditsTabNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  const lang = navigation.getParam('lang');

  const local = translate[0][lang];

  let title = '';
  if (routeName === 'Cast') {
    title = local.CAST_TITLE;
  } else if (routeName === 'Crew') {
    title = local.CREW_TITLE;
  } else {
    title = routeName;
  }
  const headerTitle = title;
  const tabBarLabel = title;

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
  const headerRight = <HeaderBackToTopButton onPress={backToTop} />;

  return {
    tabBarLabel,
    headerTitle,
    headerRight
  };
};
CreditsTabNavigator.tabBarLabel = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  const lang = navigation.getParam('lang');

  // You can do whatever you like here to pick the title based on the route name

  const local = translate[0][lang];

  let title = '';
  if (routeName === 'Cast') {
    title = local.CAST_TITLE;
  } else if (routeName === 'Crew') {
    title = local.CREW_TITLE;
  } else {
    title = routeName;
  }
  const tabBarLabel = title;

  return {
    tabBarLabel
  };
};

const MainNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    Movies: MoviesScreen,
    MovieDetail: MovieDetailScreen,
    Settings: SettingsScreen,
    Credits: CreditsTabNavigator
  },
  {
    initialRouteName: 'Search',
    initialRouteParams: { lang: 'en' },
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const MovieNavigator = createAppContainer(MainNavigator);
export default MovieNavigator;
