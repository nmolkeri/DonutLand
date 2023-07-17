import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { postCustomer, postMultipltItemsOrder, postOrder } from "../../api";
import DonutLandButton from "../../components/dButton";
import Input from "../../components/input";
import Item from "../../components/item";
import { cartSlice } from "../../store/cartSlice";
import { generateUUID } from "../../utils";

const Checkout = ({ navigation }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  var cartItems = useSelector((state) => state.cart.donuts);
  const [nameIsEmpty, setNameIsEmpty] = useState(false);
  const [numberIsEmpty, setNumberIsEmpty] = useState(false);
  const dispatch = useDispatch();

  const handleNameChange = (name) => {
    setName(name);
  };

  const handleNumberChange = (number) => {
    setNumber(number);
  };

  const renderItem = (item) => (
    <Item name={item.name} quantity={item.quantity} />
  );

  const checkout = async () => {
    if (name == "") {
      setNameIsEmpty(name == "");
      Alert.alert("Name empty", "Please enter a valid name.");
      return;
    }

    if (number == "") {
      setNumberIsEmpty(numberIsEmpty == "");
      Alert.alert("Empty number", "Please enter a valid number.");
      return;
    }

    const data = {
      id: generateUUID(32),
      name: name,
      phone: number,
    };

    try {
      const response = await postCustomer(data);

      const orderData = {
        id: generateUUID(32),
        name: name,
        customerId: response.data.id,
      };

      const orderRes = await postOrder(orderData);

      const transformedData = cartItems
        .map((item) => {
          const { id, name, quantity } = item;
          const donutsArray = [];

          for (let i = 0; i < quantity; i++) {
            donutsArray.push({
              id: generateUUID(32),
              name: name,
              donutId: id,
            });
          }
          return donutsArray;
        })
        .flat();

      var bulkJson = { bulk: transformedData };
      await postMultipltItemsOrder(orderRes.data.id, bulkJson);
      dispatch(cartSlice.actions.clearCart());
      navigation.popToTop();
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Input
        placeholder="Enter your name"
        keyboardType="default"
        header="Name"
        showRedBorder={nameIsEmpty}
        onInputChange={handleNameChange}
      />
      <Input
        placeholder="Enter a number"
        keyboardType="numeric"
        header="Number"
        showRedBorder={numberIsEmpty}
        onInputChange={handleNumberChange}
      />
      {cartItems.map((item) => renderItem(item))}
      <DonutLandButton title="Checkout" onPress={checkout} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
});

export default Checkout;
