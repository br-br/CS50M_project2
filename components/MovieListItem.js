import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import translations from '../helpers/translate';
import Colors from '../constants/colors';

const MovieListItem = props => {
  const mode = props.mode;
  const movie = props.movie;
  const index = props.index;
  const onSelect = props.onPress;
  const lang = props.lang ? props.lang : 'en';

  const local = translations[0][lang];
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onSelect}
      style={styles.movieContainer}>
      <View style={styles.movieItem}>
        <Image
          source={{
            uri: 'https://image.tmdb.org/t/p/original/' + movie.poster_path
          }}
          style={styles.movieImg}
        />

        <View style={styles.infoBox}>
          <Text numberOfLines={3} style={styles.infoHeader}>
            {movie.title}
          </Text>
          {movie.release_date ? (
            <Text style={styles.infoText}>
              {local.YEAR}: {movie.release_date.slice(0, 4)}
            </Text>
          ) : null}

          {mode === null ? (
            <View>
              <Text style={styles.infoText}>
                {local.SCORE}: {movie.vote_average} ( {movie.vote_count}{' '}
                {local.VOTES})
              </Text>
              {/* <Text style={styles.debugText}>
                Film {index + 1} {local.ON_LIST}
              </Text> */}
            </View>
          ) : null}
          {movie.character && movie.character.length > 0 ? (
            <View>
              <Text style={styles.roleText}>
                {local.AS} {movie.character}
              </Text>
            </View>
          ) : null}
          {movie.job && movie.job.length > 0 ? (
            <View>
              <Text style={styles.roleText}>
                {local.JOB}: {movie.job}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    padding: 2
  },
  movieItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: 'linen',
    elevation: 4,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: 'linen',
    marginVertical: 4,
    marginHorizontal: 8
  },
  movieImg: {
    width: 70,
    height: 100,
    resizeMode: 'contain',
    marginLeft: 0,
    paddingLeft: 0
  },
  infoBox: {
    width: 0,
    flexGrow: 1,
    marginHorizontal: 10,
    justifyContent: 'flex-start'
  },

  infoHeader: {
    fontFamily: 'architects-daughter',
    fontSize: 18
  },
  infoText: {
    fontFamily: 'quicksand-reg',
    fontSize: 13
  },
  debugText: {
    color: 'darkorange'
  },
  roleText: {
    color: Colors.primary
  }
});
export default withNavigation(MovieListItem);
