import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Item = ({ name, quantity, onTapped }) => {
  return (
    <TouchableOpacity onPress={onTapped}>
      <View style={styles.itemContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.quantity}>{quantity}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Item;
