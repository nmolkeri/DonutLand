import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AddEditDonut = () => {
    
  return (
    <View>
      <Text>AddEditDonut</Text>
        <Text>Add button if new donut</Text>
        <Text>Edit button if old donut</Text>
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

export default AddEditDonut;