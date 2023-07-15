import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Customer = () => {
    
  return (
    <View>
      <Text>Customer</Text>
      <Text>Display donut list here</Text>
      <Text>Show donut details to add topping</Text>
      <Text>Show sold out if sold out</Text>
      <Text>No more than 24 donuts can be added to card</Text>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{"Customize donut"}</Text>
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

export default Customer;