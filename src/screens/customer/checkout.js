import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Checkout = () => {
    
  return (
    <View>
      <Text>Checkout page</Text>
      <Text>Display donuts added to cart here</Text>
      <Text>Text inputs for name and phone number</Text>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{"Customer"}</Text>
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

export default Checkout;