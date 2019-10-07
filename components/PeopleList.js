import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import PeopleListItem from './PeopleListItem';
import translate from '../helpers/translate';

const renderItem = (itemData, props) => {
  const person = itemData.item;
  const index = itemData.index;
  const navigation = props.navigation;
  const lang = props.lang;

  return (
    <PeopleListItem
      navigation={navigation}
      person={person}
      index={index}
      lang={lang}
      onPress={() =>
        navigation.navigate({
          routeName: 'Profile',
          params: {
            name: person.name,
            id: person.id,
            lang: lang
          }
        })
      }
    />
  );
};

const PeopleList = props => {
  const lang = props.lang;

  const local = translate[0][lang];
  return props.listData.length > 0 ? (
    <View style={styles.listContainer}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item, index) => renderItem(item, props)}
      />
    </View>
  ) : (
    <View>
      <Text>{local.NO_INFO}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {}
});

export default withNavigation(PeopleList);
