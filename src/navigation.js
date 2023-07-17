import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Alert, Pressable, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import AddEditItem from "./screens/admin/addItem";
import Admin from "./screens/admin/admin";
import DonutDashboard from "./screens/admin/donutDashboard";
import OrderDetails from "./screens/admin/order";
import OrderList from "./screens/admin/orderList";
import Checkout from "./screens/customer/checkout";
import Customer from "./screens/customer/customer";
import CustomizeDonut from "./screens/customer/customizeDonut";
import PickMember from "./screens/pickMember";
const Stack = createNativeStackNavigator();

const Navigation = () => {
  var numberOfItems = useSelector((state) => state.cart.donutCount);

  const handleCheckoutTapped = (navigation) => {
    if (numberOfItems == 0) {
      Alert.alert("Empty cart", "Add Donuts to cart");
    } else {
      navigation.navigate("Checkout");
    }
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Pick Member"
          component={PickMember}
          options={{
            title: "Pick Member",
          }}
        />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen
          name="OrderList"
          component={OrderList}
          options={{
            title: "Orders",
          }}
        />
        <Stack.Screen
          name="DonutDashboard"
          component={DonutDashboard}
          options={{
            title: "Dashboard",
          }}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
          options={{ presentation: "modal", title: "Order details" }}
        />
        <Stack.Screen
          name="Customer"
          component={Customer}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                onPress={() => handleCheckoutTapped(navigation)}
                style={styles.pressableContainer}
              >
                <Text style={styles.numberOfItemsText}>{numberOfItems}</Text>
                <Icon name="shopping-cart" size={25} color="black" />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="CustomizeDonut"
          component={CustomizeDonut}
          options={{ presentation: "modal", title: "Customize Donut" }}
        />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen
          name="AddEditItem"
          component={AddEditItem}
          options={{ presentation: "modal", title: "Add/Edit" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  pressableContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  numberOfItemsText: {
    marginRight: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Navigation;
