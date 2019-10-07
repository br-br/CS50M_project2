import React, { Component } from 'react';
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

const showMovies = (movieList, name, lang, navigation) => {
  const movies = movieList.filter(movie => {
    return (
      (movie.character && movie.character.length > 0) ||
      (movie.job && movie.job.length > 0)
    );
  });
  navigation.push('Movies', { movies: movies, lang: lang, name: name });
};
const PeopleProfile = props => {
  const navigation = props.navigation;
  const name = props.name;
  const details = props.details;
  const movies = props.movies;

  const lang = props.lang ? props.lang : 'en';
  const local = translations[0][lang];
  const biography = details.biography ? details.biography : null;

  const born = details.birthday ? reformatDate(details.birthday) : null;
  const died = details.deathday ? reformatDate(details.deathday) : null;
  const city = details.place_of_birth ? details.place_of_birth : null;
  const site = details.homepage ? details.homepage : null;
  const showMoviesName = local.SHOW_MOVIES + ' ' + name;

  return (
    <ScrollView vertical={true} style={styles.personContainer}>
      <View style={styles.personItem} pagingEnabled={true}>
        {details.profile_path ? (
          <Image
            source={{
              uri: 'https://image.tmdb.org/t/p/original' + details.profile_path
            }}
            style={styles.personImg}
          />
        ) : (
          <View style={styles.infoText}>
            <Text>{local.NO_PHOTO}</Text>
          </View>
        )}
        <View style={styles.listHeader}>
          <Text numberOfLines={3} style={styles.headerText}>
            {name}
          </Text>
        </View>
        <View style={styles.listText}>
          {born && city ? (
            <Text>
              {local.BORN} {born} {local.IN} {city}
            </Text>
          ) : null}

          {died ? (
            <Text>
              {local.DIED} {died}
            </Text>
          ) : null}
        </View>

        <View style={styles.listText}>
          {site ? (
            <Text>
              {local.SITE}: {site}
            </Text>
          ) : null}
        </View>

        {biography ? (
          <View style={styles.listText}>
            <Text>{local.BIOGRAPHY}:</Text>
            <Text>{biography}</Text>
          </View>
        ) : null}
        <View style={styles.button}>
          <Button
            color={Colors.secondary}
            title={showMoviesName}
            onPress={() => {
              showMovies(movies, name, lang, navigation);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  personContainer: {
    padding: 10
  },
  personItem: {
    marginBottom: 25
  },
  personImg: {
    width: '100%',
    height: 300
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
  infoText: {
    flex: 1,
    textAlign: 'center',
    padding: 50
  },
  button: {
    padding: 10,
    width: '100%',
    borderRadius: 25,
    marginBottom: 10
  }
});

export default withNavigation(PeopleProfile);
