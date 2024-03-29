import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { deleteOrder, getOrderItem } from "../../api";
import Item from "../../components/item";
import ItemSectionList from "../../components/itemSectionList";
import RoundButton from "../../components/roundButton";

const OrderDetails = ({ route, navigation }) => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [orderId, setOrderId] = useState("");

  var ids = "";

  useEffect(() => {
    const data = route.params.data;
    ids = data.id;
    fetchDonutsData();
  }, [route.params.data]);

  useEffect(() => {
    const orderNamesArray = orderData.map((item) => item.order.name);
    setName(orderNamesArray[0]);
    const orderIds = orderData.map((item) => item.orderId);
    setOrderId(orderIds[0]);
  }, [orderData]);

  const fetchDonutsData = async () => {
    if (ids) {
      await getOrderItem(ids)
        .then((response) => {
          setOrderData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("API error:", error);
        });
    } else {
      console.log("Data is not set yet, cannot make the web call.");
    }
  };

  const renderSectionHeader = ({ section: { name, quantity } }) => (
    <Item name={name} quantity={quantity} />
  );

  const renderItem = ({ item }) => (
    <View>{item != null || item != "" ? <Text>{item}</Text> : {}}</View>
  );

  const groupedSections = orderData.reduce((acc, item) => {
    const existingItem = acc.find(
      (groupedItem) => groupedItem.name === item.name
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({
        name: item.name,
        quantity: 1,
        data: item.toppings || [],
      });
    }
    return acc;
  }, []);

  const sections = groupedSections.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    data: item.data,
  }));

  const completeOrder = async () => {
    await deleteOrder(orderId)
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Customer: {name}</Text>
        <RoundButton onPress={completeOrder} iconName="check" />
      </View>

      <ItemSectionList
        loading={loading}
        data={sections}
        renderHeader={renderSectionHeader}
        renderItem={renderItem}
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
  checkButton: {
    backgroundColor: "#3498db",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrderDetails;
