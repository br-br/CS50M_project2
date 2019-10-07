import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import translations from '../helpers/translate';

const PeopleListItem = props => {
  const onSelect = props.onPress;

  const person = props.person;
  const lang = props.lang ? props.lang : 'en';
  const local = translations[0][lang];

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onSelect}
      style={styles.personContainer}>
      <View style={styles.personItem}>
        <View style={styles.infoBox}>
          <Text numberOfLines={3} style={styles.infoHeader}>
            {person.name}
          </Text>
          {person.job ? (
            <Text style={styles.infoText}>{person.job}</Text>
          ) : null}
          {person.character ? (
            <Text style={styles.infoText}>
              {local.ROLE} {person.character}
            </Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  personContainer: {
    padding: 2
  },
  personItem: {
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

  infoBox: {
    marginHorizontal: 10,
    justifyContent: 'flex-start'
  },

  infoHeader: {
    fontFamily: 'architects-daughter',
    fontSize: 18
  },
  infoText: {
    fontFamily: 'quicksand-reg',
    fontSize: 15
  },
  debugText: {
    color: 'darkorange'
  }
});
export default withNavigation(PeopleListItem);
