import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';

const RadioButton = props => {
  const size = props.size ? props.size : 28;
  const color = props.color ? props.color : Colors.primary;
  return (
    <TouchableOpacity
      onPress={props.onClick}
      activeOpacity={0.7}
      style={styles.radioButton}>
      <View
        style={[
          styles.radioButtonHolder,
          {
            height: size,
            width: size,
            borderColor: color
          }
        ]}>
        {props.button.selected ? (
          <View
            style={[
              styles.radioIcon,
              {
                height: size * 0.7,
                width: size * 0.7,
                backgroundColor: color
              }
            ]}></View>
        ) : null}
      </View>
      <Text style={[styles.label, { color: color, fontSize: size * 0.65 }]}>
        {props.button.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  radioButtonHolder: {
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  radioIcon: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    marginLeft: 10
  }
});

export default RadioButton;
