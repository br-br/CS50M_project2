import React from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import MovieNavigator from './navigation/MovieNavigator';

const fetchFonts = () => {
  return Font.loadAsync({
    'architects-daughter': require('./assets/fonts/ArchitectsDaughter-Regular.ttf'),
    'livvic-reg': require('./assets/fonts/Livvic-Regular.ttf'),
    'livvic-bold': require('./assets/fonts/Livvic-Bold.ttf'),
    'quicksand-reg': require('./assets/fonts/Quicksand-Regular.ttf'),
    'quicksand-bold': require('./assets/fonts/Quicksand-Bold.ttf')
  });
};

export default class App extends React.Component {
  state = { fontLoaded: false };

  // rendercontent() {
  //   if (this.state.fontLoaded) return <MovieNavigator />;
  //   return (
  //     <AppLoading
  //       startAsync={fetchFonts}
  //       onFinish={() => {
  //         this.setState({ fontLoaded: true });
  //       }}
  //       onError={err => console.log(err)}
  //     />
  //   );
  // }

  render() {
    return this.state.fontLoaded ? (
      <MovieNavigator />
    ) : (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          this.setState({ fontLoaded: true });
        }}
        onError={err => console.log(err)}
      />
    );
    // return this.rendercontent();
    // return <MovieNavigator />;
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });
