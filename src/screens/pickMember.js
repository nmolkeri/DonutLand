import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DonutLandButton from "../components/dButton";

const PickMember = ({ navigation }) => {
  return (
    <View>
      <Text>Pick member screen</Text>
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

const styles = StyleSheet.create({});

export default PickMember;
