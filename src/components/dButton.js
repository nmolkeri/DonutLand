import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const DonutLandButton = ({ title, onPress, isVisible = true }) => {
  if (!isVisible) {
    return null;
  }
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DonutLandButton;
