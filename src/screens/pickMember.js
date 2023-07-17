import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DonutLandButton from "../components/dButton";

const PickMember = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Pick Member</Text>
      <DonutLandButton
        title="Admin"
        onPress={() => {
          navigation.navigate("Admin");
        }}
      />

      <DonutLandButton
        title="Customer"
        onPress={() => {
          navigation.navigate("Customer");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  headerText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PickMember;
