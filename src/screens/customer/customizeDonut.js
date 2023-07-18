import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { getTopping } from "../../api";
import DonutLandButton from "../../components/dButton";
import Item from "../../components/item";
import ItemList from "../../components/itemList";
import { cartSlice } from "../../store/cartSlice";

const CustomizeDonut = ({ route, navigation }) => {
  const [toppings, setToppings] = useState([]);
  var toppingsAdded = [];
  var [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [donutData, setDonutData] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    const data = route.params.data;
    setDonutData(data);
  }, [route.params.data]);

  useEffect(() => {
    fetchToppings();
  }, []);

  const fetchToppings = async () => {
    await getTopping()
      .then(function (response) {
        setToppings(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  };
  const handleItemPress = (item) => {
    const itemPresent = toppingsAdded.find((i) => i.id === item.id);
    if (!itemPresent) {
      setAlertMessage(`${item.name} added`);
      toppingsAdded.push(item);
    } else {
      setAlertMessage(`${item.name} removed`);
      toppingsAdded = toppingsAdded.filter((i) => i !== item);
    }
  };

  const addDonutToCart = () => {
    dispatch(
      cartSlice.actions.addItemToCart({
        id: donutData.id,
        name: donutData.name,
        amount: 1,
      })
    );
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <Item name={item.name} onTapped={handleItemPress} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{donutData.name}</Text>
      <Text style={styles.subHeaderText}>Tap on topping to add on donut</Text>
      <ItemList loading={loading} data={toppings} renderItem={renderItem} />
      <DonutLandButton title="Add donut to cart" onPress={addDonutToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
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
  headerText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  subHeaderText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default CustomizeDonut;
