import React from "react";
import { ActivityIndicator, SectionList, Text, View } from "react-native";

const ItemSectionList = ({ loading, data, renderItem, renderHeader }) => {
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return data ? (
    <SectionList
      sections={data}
      keyExtractor={(item, index) => item + index}
      renderSectionHeader={renderHeader}
      renderItem={renderItem}
    />
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Data not available</Text>
    </View>
  );
};

export default ItemSectionList;
