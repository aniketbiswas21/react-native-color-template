import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  FlatList,
  SafeAreaView,
  TouchableHighlight,
  Alert,
} from 'react-native';
import colors from '../data/colors';

const ColorPalleteModal = ({ navigation }) => {
  const [palette, setPalette] = React.useState({
    name: '',
    colors: {},
  });

  const toggleSwitch = useCallback(
    color => {
      const newColors = { ...palette.colors };
      newColors[color] = !newColors[color];
      setPalette({ ...palette, colors: newColors });
    },
    [palette],
  );

  const onSubmit = useCallback(() => {
    if (!palette.name || Object.keys(palette.colors).length === 0) {
      return Alert.alert(
        'Error',
        'Please enter a name and select at least one color',
      );
    }

    let colorSelected = false;

    Object.values(palette.colors).forEach(color => {
      if (color) {
        colorSelected = true;
      }
    });

    if (!colorSelected) {
      return Alert.alert('Error', 'Please select at least one color');
    }

    const newPalette = {
      id: Math.floor(Math.random() * 1000000),
      paletteName: palette.name,
      colors: Object.keys(palette.colors).map(color => {
        if (palette.colors[color]) {
          return {
            colorName: color,
            hexCode: colors.find(c => c.colorName === color).hexCode,
          };
        }
      }),
    };

    navigation.navigate('Home', {
      params: {
        newPalette,
      },
    });
  }, [palette]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.formElement}>
        <Text>Name of your colour palette</Text>
        <TextInput
          style={styles.formInput}
          placeholder="Palette Name"
          value={palette.name}
          onChangeText={e => setPalette(old => ({ ...old, name: e }))}
        />
      </View>
      <FlatList
        style={styles.colorList}
        data={colors}
        keyExtractor={item => item.colorName}
        renderItem={({ item }) => (
          <View style={[styles.formElement, styles.formToggle]}>
            <Text style={styles.toggleText}>{item.colorName}</Text>
            <Switch
              value={!!palette.colors[item.colorName]}
              onChange={() => {
                toggleSwitch(item.colorName);
              }}
            />
          </View>
        )}
      />
      <TouchableHighlight style={styles.button} onPress={onSubmit}>
        <Text style={{ color: 'white' }}>Submit</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formElement: {
    margin: 10,
  },
  formInput: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  formToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toggleText: {
    alignSelf: 'center',
  },
  colorList: {
    margin: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#017575',
    padding: 10,
    margin: 10,
  },
});

export default ColorPalleteModal;
