import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OrderDetails = () => {
    
  return (
    <View>
      <Text>OrderDetails</Text>
        <Text>See the details of order</Text>
        <Text> See customer details here</Text>
      <TouchableOpacity style={styles.button} >
      <Text style={styles.buttonText}>{"Complete order"}</Text>
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

export default OrderDetails;