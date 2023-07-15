import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DonutDashboard = () => {
    
  return (
    <View>
      <Text>Donut dashboard</Text>
        <Text>Add section to display donuts</Text>
        <Text>Add section to display toppings list</Text>
        <Text>right top button to add donut or topping</Text>
        <Text>Add, edit or sold out option for donut and topping</Text>
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

export default DonutDashboard;