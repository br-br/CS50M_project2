import React from 'react';
import { StyleSheet, Platform, View, TouchableHighlight } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/colors';

const HeaderSettingsButton = props => {
  return (
    <View>
      <TouchableHighlight
        lang={props.lang}
        style={styles.container}
        activeOpacity={0.7}
        onPress={props.onPress}>
        <MaterialIcons style={styles.icon} name='settings' size={28} />
      </TouchableHighlight>
    </View>
  );
};
const iconColor =
  Platform.OS === 'android' ? Colors.primaryText : Colors.primary;
const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 30,
    overflow: 'hidden'
  },
  icon: {
    color: iconColor
  }
});

export default HeaderSettingsButton;
