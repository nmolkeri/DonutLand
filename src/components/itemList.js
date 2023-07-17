import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const ItemList = ({ loading, data, renderItem }) => {
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return data ? (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Data not available</Text>
    </View>
  );
};

export default ItemList;
