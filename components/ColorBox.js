import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ColorBox = ({ colorName, colorHex }) => {
  const boxColor = {
    backgroundColor: colorHex,
  };

  const textColor = {
    color:
      parseInt(colorHex.replace('#', ''), 16) > 0xffffff / 1.1
        ? '#000'
        : '#fff',
  };

  return (
    <View style={[styles.box, boxColor]}>
      <Text style={[styles.boxText, textColor]}>
        {colorName}: {colorHex}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ColorBox;
