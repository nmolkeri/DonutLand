import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OrderList = ({ navigation }) => {
    const navigateToOrderDetails = () => {
        //update selected product
        //dispatch an event in air. Reducer will catch this action and current state. 
        // dispatch(productSlice.actions.setSelected(item.id));
        navigation.navigate('OrderDetails');
      };

  return (
    <View>
      <Text>OrderList</Text>
        <Text>Show list of orders</Text>
        <Text>tap on order, take the admin to order details </Text>

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