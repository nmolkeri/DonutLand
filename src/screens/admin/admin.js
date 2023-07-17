import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DonutLandButton from "../../components/dButton";

const Admin = ({ navigation }) => {
  const navigateToOrderlist = () => {
    navigation.navigate("OrderList");
  };

  const navigateToDashBoard = () => {
    navigation.navigate("DonutDashboard");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Pick what you wanna do</Text>
      <DonutLandButton title="Order list" onPress={navigateToOrderlist} />
      <DonutLandButton title="Donut dashboard" onPress={navigateToDashBoard} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Admin;
