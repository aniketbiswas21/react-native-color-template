import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import ColorList from '../components/ColorList';

const ColorPallete = props => {
  const {
    route: { params },
  } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Here are some boxes of different colors</Text>
      <ColorList data={params.colors} name={params.paletteName} />
    </View>
  );
};

const styles = StyleSheet.create({
  cyan: {
    backgroundColor: '#2aa198',
  },
  blue: {
    backgroundColor: '#268bd2',
  },
  magenta: {
    backgroundColor: '#d33682',
  },
  orange: {
    backgroundColor: '#cb4b16',
  },
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    // marginTop: 30,
    backgroundColor: '#fff',
  },
  box: {
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    color: '#fff',
  },
  safeArea: {
    flex: 2,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default ColorPallete;
