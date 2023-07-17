import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { generateUUID } from '../../utils';
import { postOrder, postCustomer, postMultipltItemsOrder } from '../../api';
import { cartSlice } from '../../store/cartSlice';

const Checkout = ({ navigation }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  var cartItems = useSelector((state) => state.cart.donuts);
  const [nameIsEmpty, setNameIsEmpty] = useState(false);
  const [numberIsEmpty, setNumberIsEmpty] = useState(false);
  const dispatch = useDispatch();

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.quantity}</Text>
    </View>
  );

  const checkout = async () => {

    if(name == '' || number == ''){
      setNameIsEmpty(name == '')
      setNumberIsEmpty(numberIsEmpty == '')
      return
    }

    const data = {
      id: generateUUID(32),
      name: name,
      phone: number
    };
    

    try {
      const response = await postCustomer(data);

      const orderData = {
        id: generateUUID(32),
        name: name,
        customerId: response.data.id
      };

      const orderRes = await postOrder(orderData);

      const transformedData = cartItems.map(item => {
        const { id, name, quantity } = item;
        const donutsArray = [];
      
        for (let i = 0; i < quantity; i++) {
          donutsArray.push({
            id: generateUUID(32), 
            name: name, 
            donutId: id,
          });
        }
        return donutsArray;
      }).flat();

      var bulkJson = {bulk: transformedData}
      await postMultipltItemsOrder(orderRes.data.id, bulkJson)
      dispatch(cartSlice.actions.clearCart());
      navigation.popToTop();

    } catch (error) {
      console.error('Error sending data:', error);
    }
  }

  return (
    <View>
      <Text>Checkout page</Text>
      <Text>Display donuts added to cart here</Text>
      <Text>Text inputs for name and phone number</Text>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter your name"        
        style={[styles.textInput, !nameIsEmpty ? {} : styles.redBorder]}
      />

      <Text style={styles.label}>Number:</Text>
      <TextInput
        value={number}
        onChangeText={(text) => setNumber(text)}
        keyboardType="numeric"
        placeholder="Enter a number"
        style={[styles.textInput, !numberIsEmpty ? {} : styles.redBorder]}
      />
      <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}/>
    <TouchableOpacity style={styles.button} onPress={checkout}>
      <Text style={styles.buttonText}>{"Checkout"} </Text>
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
    label: {
      fontSize: 18,
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
      marginBottom: 20,
    },
    textInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 10,
    },
    redBorder: {
      borderColor: 'red',
    },
  });

export default Checkout;