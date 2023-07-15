import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomizeDonut = () => {
    
  return (
    <View>
      <Text>Customize Donut</Text>
      <Text>Show donut details if available</Text>
      <Text>Limit only 3 toppings</Text>
      <Text>Show sold out if sold out</Text>
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

export default CustomizeDonut;