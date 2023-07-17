import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getDonuts } from "../../api";
import ItemList from "../../components/itemList";
import { cartSlice } from "../../store/cartSlice";

const Customer = ({ navigation }) => {
  const [donutData, setDonutData] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  var cartItems = useSelector((state) => state.cart.donuts);

  useEffect(() => {
    fetchDonutData();
  }, []);

  const fetchDonutData = async () => {
    await getDonuts()
      .then(function (response) {
        setDonutData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const handleIncrement = (item) => {
    console.log(cartItems);
    dispatch(
      cartSlice.actions.addItemToCart({
        id: item.id,
        name: item.name,
        amount: 1,
      })
    );
  };

  const handleDecrement = (item) => {
    console.log(cartItems);
    dispatch(
      cartSlice.actions.addItemToCart({
        id: item.id,
        name: item.name,
        amount: -1,
      })
    );
  };

  const donutsWithQuantityById = cartItems.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));

  const findQuantityById = (id) => {
    const item = donutsWithQuantityById.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => navigateToCustomizeDonut(item)}>
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
      <View style={styles.stepperContainer}>
        <TouchableOpacity
          style={styles.stepperButton}
          onPress={() => handleDecrement(item)}
        >
          <Text style={styles.stepperButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.count}>{findQuantityById(item.id)}</Text>
        <TouchableOpacity
          style={styles.stepperButton}
          onPress={() => handleIncrement(item)}
        >
          <Text style={styles.stepperButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const navigateToCustomizeDonut = (item) => {
    navigation.navigate("CustomizeDonut", { data: item });
  };

  const clearCart = () => {
    console.log("Clear cart");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subHeaderText}>
        Tap on donut name to customize topping
      </Text>
      <ItemList loading={loading} data={donutData} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  text: {
    fontSize: 16,
  },
  subHeaderText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 5,
  },
  stepperButton: {
    width: 40,
    height: 40,
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperButtonText: {
    fontSize: 20,
  },
  counterText: {
    fontSize: 18,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepperButton: {
    width: 30,
    height: 30,
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  stepperButtonText: {
    fontSize: 20,
  },
  count: {
    fontSize: 18,
  },
});

export default Customer;
