import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  Button
} from 'react-native';
import { withNavigation } from 'react-navigation';
import translations from '../helpers/translate';
import { reformatDate } from '../helpers/functions';
import Colors from '../constants/colors';

const getMainActors = movie => {
  const actors = [movie.credits.cast];

  const mainActors = actors[0].slice(0, 3);
  return mainActors;
};
const getDirector = movie => {
  const crew = [movie.credits.crew];
  const director = crew[0]
    .filter(person => person.job === 'Director')
    .map(person => {
      return person;
    });
  return director[0];
};
const MovieDetail = props => {
  const movie = props.movie;
  const navigation = props.navigation;
  const lang = props.lang ? props.lang : 'en';
  const local = translations[0][lang];

  // const actors = getMainActors(movie);

  const director = getDirector(movie);

  const showCredits = () => {
    const credits = movie.credits;
    navigation.push('Credits', { credits: credits, lang: lang });
  };

  let date = reformatDate(movie.release_date);
  const description =
    movie.overview.length > 2 ? movie.overview : local.NOSTORY;

  return (
    <ScrollView vertical={true} style={styles.movieContainer}>
      <View style={styles.movieItem} pagingEnabled={true}>
        <Image
          source={{
            uri: 'https://image.tmdb.org/t/p/original/' + movie.backdrop_path
          }}
          style={styles.movieImg}
        />
        <View style={styles.listHeader}>
          <Text numberOfLines={3} style={styles.headerText}>
            {movie.title}
          </Text>
        </View>
        <View style={styles.listText}>
          <Text>
            {local.TITLE}: {movie.original_title}
          </Text>
          <Text>
            {local.DATE}: {date}
          </Text>
          {director ? (
            <Text>
              {local.REGIE}: {director.name}
            </Text>
          ) : null}
        </View>

        <View style={styles.listText}>
          {movie.runtime ? (
            <Text>
              {local.RUNTIME}: {movie.runtime} min
            </Text>
          ) : null}

          <Text>
            {local.SCORE}: {movie.vote_average} ({movie.vote_count}{' '}
            {local.VOTES})
          </Text>
        </View>
        {movie.homepage ? (
          <View style={styles.listText}>
            <Text>{local.SITE}:</Text>
            <Text>{movie.homepage}</Text>
          </View>
        ) : null}
        <View></View>
        <View style={styles.listText}>
          <Text>{local.STORY}:</Text>
          <Text>{description}</Text>
        </View>
        <View style={styles.creditsBtn}>
          <Button
            color={Colors.secondary}
            title={local.CREDITS}
            onPress={showCredits}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  movieContainer: {
    padding: 10
  },
  movieItem: {
    marginBottom: 25
  },
  movieImg: {
    width: '100%',
    height: 250
  },
  headerText: {
    fontFamily: 'architects-daughter',
    fontSize: 22,
    textAlign: 'center'
  },
  listHeader: {
    marginTop: 5
  },
  listText: {
    padding: 5
  },
  creditsBtn: {
    padding: 10,
    width: '100%',
    borderRadius: 25
  }
});

export default withNavigation(MovieDetail);
