import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OrderList = () => {
    
  return (
    <View>
      <Text>OrderList</Text>
        <Text>Show list of orders</Text>
        <Text>tap on order, take the admin to order details </Text>

      <TouchableOpacity style={styles.button} >
      <Text style={styles.buttonText}>{"Order details "}</Text>
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