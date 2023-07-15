import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Admin = ({ navigation }) => {
  const navigateToOrderlist = () => {
    //update selected product
    //dispatch an event in air. Reducer will catch this action and current state. 
    // dispatch(productSlice.actions.setSelected(item.id));
    console.log("order list tapped");
    navigation.navigate('OrderList');
  };

  const navigateToDashBoard = () => {
    //update selected product
    //dispatch an event in air. Reducer will catch this action and current state. 
    // dispatch(productSlice.actions.setSelected(item.id));
    console.log("donut dashboard tapped tapped");
    navigation.navigate('DonutDashboard');
  };

  return (
    <View>
      <Text>Admin</Text>

      <TouchableOpacity style={styles.button}
      onPress={navigateToOrderlist} >
      <Text style={styles.buttonText}>{"Order list"} </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} 
    onPress={navigateToDashBoard}>
      <Text 
        style={styles.buttonText}>{"Donut dashboard"} 
        
      </Text>
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

export default Admin;