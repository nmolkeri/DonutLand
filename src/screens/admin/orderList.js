import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { getOrder } from '../../api';

const OrderList = ({ navigation }) => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchDonutsData();
    }, []);

    const fetchDonutsData = async () => {
      getOrder()
      .then(function (response) {
        console.log("got response from server")
        setOrderData(response.data);
         setLoading(false);
        console.log(response.data);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      })
    };

    const navigateToOrderDetails = (id) => {
      console.log("asdfasdf")
      console.log(id)
        navigation.navigate('OrderDetails', {data: {id: id}});
      };

      const renderOrder = ({ item }) => (
        <TouchableOpacity onPress={() => navigateToOrderDetails(item.id)}>
          <View style={styles.item}>
              <Text>Name: {item.name}</Text>
          </View>
        </TouchableOpacity>
      );

  return (
    <View>
      <Text>OrderList</Text>
        <Text>Show list of orders</Text>
        <Text>tap on order, take the admin to order details </Text>

        {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : orderData ? (
        <FlatList
          keyExtractor={(item) => item.id}
          data={orderData}
          renderItem={renderOrder}
        />
      ) : (
        <Text>Data not available</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={navigateToOrderDetails}>
      <Text style={styles.buttonText}>{"Order details"}</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#3498db',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 30
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    }, 
    item: {
      height: 40,
      borderWidth: 1,
      borderColor: 'black',
    },
  });

export default OrderList;