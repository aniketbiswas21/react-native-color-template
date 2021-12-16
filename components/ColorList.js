import React from 'react';
import { View, FlatList, Text } from 'react-native';
import ColorBox from './ColorBox';

const ColorList = ({ data, name }) => {
  const renderItem = ({ item }) => {
    return <ColorBox colorName={item.colorName} colorHex={item.hexCode} />;
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.hexCode}
        ListHeaderComponent={<Text>{name}</Text>}
      />
    </View>
  );
};

export default ColorList;
