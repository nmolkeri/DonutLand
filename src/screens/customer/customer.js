import { FlatList } from 'native-base';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { cartSlice } from '../../store/cartSlice';

const Customer = ({ navigation }) => {
  const [counter, setCounter] = useState(0);
  const [donutData, setDonutData] = useState([]);
  const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const id = useSelector((state) => state.item.selectedProductId);

    useEffect(() => {
      fetchDonutData();
    }, []);

    const fetchDonutData = async () => {
      await axios.get('http://localhost:3100/donut')
          .then(function (response) {
            setDonutData(response.data);
            setLoading(false);
          })
          .catch(function (error) {
            setLoading(false);
          })
    };

  const handleIncrement = (item) => {
    dispatch(cartSlice.actions.addItemToCart({id: item.id, name: item.name, amount: 1}));
  };

  const handleDecrement = (item) => {
    dispatch(cartSlice.actions.addItemToCart({id: item.id, name: item.name, amount: -1}));
  };

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.stepperContainer}>
        <TouchableOpacity style={styles.stepperButton} onPress={() => handleDecrement(item)}>
          <Text style={styles.stepperButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.count}>{counter}</Text>
        <TouchableOpacity style={styles.stepperButton} onPress={() => handleIncrement(item)}>
          <Text style={styles.stepperButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const navigateToCustomizeDonut = () => {
    //update selected product
    //dispatch an event in air. Reducer will catch this action and current state. 
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