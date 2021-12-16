import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useColors from '../hooks/useColors';

const Home = ({ navigation, route }) => {
  const [colors, fetchColors, fetchState] = useColors(route);
  return (
    <SafeAreaView style={styles.container}>
      {fetchState === 'success' ? (
        <FlatList
          data={colors}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('ColorPalleteModal');
              }}>
              <Text style={{ color: 'white' }}>Add new colour</Text>
            </TouchableOpacity>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Main', {
                  screen: 'ColorPalette',
                  params: {
                    paletteName: item.paletteName,
                    colors: item.colors,
                  },
                });
              }}>
              <Text style={styles.heading}>{item.paletteName}</Text>
              <FlatList
                data={item.colors.slice(0, 5)}
                renderItem={({ item }) => (
                  <View
                    style={[styles.colorBox, { backgroundColor: item.hexCode }]}
                  />
                )}
                keyExtractor={item => item.hexCode}
                horizontal={true}
              />
            </TouchableOpacity>
          )}
          onRefresh={() => {
            fetchColors();
          }}
          refreshing={fetchState === 'pending'}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#017575',
    padding: 10,
    margin: 10,
  },
  colorBox: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export default Home;
