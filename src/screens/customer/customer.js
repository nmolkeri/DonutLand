import { FlatList } from 'native-base';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { cartSlice } from '../../store/cartSlice';
import { getDonuts } from '../../api';
const Customer = ({ navigation }) => {
  const [donutData, setDonutData] = useState([]);
  const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    var cartItems = useSelector((state) => state.cart.donuts);

    useEffect(() => {
      fetchDonutData();
    }, []);

    const fetchDonutData = async () => {
      await getDonuts()
          .then(function (response) {
            setDonutData(response.data);
            setLoading(false);
          })
          .catch(function (error) {
            setLoading(false);
          })
    };

  const handleIncrement = (item) => {
    console.log(cartItems)
    dispatch(cartSlice.actions.addItemToCart({id: item.id, name: item.name, amount: 1}));
  };

  const handleDecrement = (item) => {
    console.log(cartItems)
    dispatch(cartSlice.actions.addItemToCart({id: item.id, name: item.name, amount: -1}));
  };

  const donutsWithQuantityById = cartItems.map(item => ({
    id: item.id,
    quantity: item.quantity
  }));
  
  const findQuantityById = (id) => {
    const item = donutsWithQuantityById.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  console.log(donutsWithQuantityById);

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToCustomizeDonut}>
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
      <View style={styles.stepperContainer}>
        <TouchableOpacity style={styles.stepperButton} onPress={() => handleDecrement(item)}>
          <Text style={styles.stepperButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.count}>{findQuantityById(item.id)}</Text>
        <TouchableOpacity style={styles.stepperButton} onPress={() => handleIncrement(item)}>
          <Text style={styles.stepperButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const navigateToCustomizeDonut = () => {
    // dispatch(productSlice.actions.setSelected(item.id));
    navigation.navigate('CustomizeDonut');
  };
  
  return (
    <View>
      <Text>Customer</Text>
      <Text>Display donut list here</Text>
      <Text>Show donut details to add topping</Text>
      <Text>Show sold out if sold out</Text>
      <Text>No more than 24 donuts can be added to card</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : donutData ? (
        <FlatList
          data={donutData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
      />
      ) : (
        <Text>Data not available</Text>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },

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
    stepperButton: {
      width: 40,
      height: 40,
      backgroundColor: '#e0e0e0',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepperButtonText: {
      fontSize: 20,
    },
    counterText: {
      fontSize: 18,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    stepperContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    stepperButton: {
      width: 30,
      height: 30,
      backgroundColor: '#e0e0e0',
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 5,
    },
    stepperButtonText: {
      fontSize: 20,
    },
    count: {
      fontSize: 18,
    },
  });

export default Customer;