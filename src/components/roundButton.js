import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const RoundButton = ({ onPress, color = "#3498db", iconName }) => {
  return (
    <TouchableOpacity
      style={[styles.checkButton, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Icon name={iconName} size={20} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RoundButton;
