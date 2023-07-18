import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { getOrder } from "../../api";
import Item from "../../components/item";
import ItemList from "../../components/itemList";

const OrderList = ({ navigation }) => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonutsData();
  }, []);

  const fetchDonutsData = async () => {
    getOrder()
      .then(function (response) {
        setOrderData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  const navigateToOrderDetails = (id) => {
    navigation.navigate("OrderDetails", { data: { id: id } });
  };

  const renderOrder = ({ item }) => (
    <Item name={item.name} onTapped={() => navigateToOrderDetails(item.id)} />
  );

  return (
    <View style={styles.container}>
      <ItemList loading={loading} data={orderData} renderItem={renderOrder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});

export default OrderList;
