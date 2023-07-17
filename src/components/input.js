import React, { useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";

const Input = ({
  placeholder = "Enter your name",
  keyboardType = "default",
  header,
  showRedBorder = false,
  onInputChange,
  value = "",
}) => {
  const [name, setName] = useState("");

  const handleInputChange = (text) => {
    setName(text);
    onInputChange(text);
  };

  return (
    <>
      <Text style={styles.label}>{header}</Text>
      <TextInput
        value={value}
        onChangeText={handleInputChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={[styles.input, showRedBorder ? styles.redBorder : {}]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  redBorder: {
    borderColor: "red",
  },
});

export default Input;
