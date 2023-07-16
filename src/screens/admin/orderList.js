import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import axios from 'axios';

const OrderList = ({ navigation }) => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchDonutData();
    }, []);

    const fetchDonutData = async () => {
      await axios.get('http://localhost:3100/order')
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

    const navigateToOrderDetails = () => {
        navigation.navigate('OrderDetails');
      };

      const renderOrder = ({ item }) => (
        <View style={styles.item}>
          <Text>ID: {item.id}</Text>
          <Text>Name: {item.name}</Text>
        </View>
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
  });

export default OrderList;