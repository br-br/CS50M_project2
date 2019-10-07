import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import MovieListItem from './MovieListItem';

const renderItem = (itemData, props) => {
  const movie = itemData.item;
  const mode = movie.character ? 'cast' : movie.job ? 'crew' : null;

  const index = itemData.index;
  const navigation = props.navigation;

  const lang = props.navigation.getParam('lang');

  return (
    <MovieListItem
      mode={mode}
      movie={movie}
      index={index}
      lang={lang}
      onPress={() => {
        props.onSelectMovie(movie, navigation, lang);
      }}
    />
  );
};

const MovieList = props => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={props.movies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item, index) => renderItem(item, props)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {}
});

export default withNavigation(MovieList);
