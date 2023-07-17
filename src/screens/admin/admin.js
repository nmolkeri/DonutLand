import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DonutLandButton from "../../components/dButton";

const Admin = ({ navigation }) => {
  const navigateToOrderlist = () => {
    //update selected product
    //dispatch an event in air. Reducer will catch this action and current state.
    // dispatch(productSlice.actions.setSelected(item.id));
    console.log("order list tapped");
    navigation.navigate("OrderList");
  };

  const navigateToDashBoard = () => {
    //update selected product
    //dispatch an event in air. Reducer will catch this action and current state.
    // dispatch(productSlice.actions.setSelected(item.id));
    navigation.navigate("DonutDashboard");
  };

  return (
    <View>
      <Text>Admin</Text>
      <DonutLandButton title="Order list" onPress={navigateToOrderlist} />
      <DonutLandButton title="Donut dashboard" onPress={navigateToDashBoard} />
    </View>
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

export default Admin;
