import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AddEditTopping = () => {
    
  return (
    <View>
      <Text>AddEditTopping</Text>
        <Text>Add button if new topping</Text>
        <Text>Edit button if old topping</Text>
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

export default AddEditTopping;