import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const Checkout = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  var cartItems = useSelector((state) => state.cart.donuts);
  console.log(cartItems);

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.quantity}</Text>
    </View>
  );

  return (
    <View>
      <Text>Checkout page</Text>
      <Text>Display donuts added to cart here</Text>
      <Text>Text inputs for name and phone number</Text>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Number:</Text>
      <TextInput
        style={styles.input}
        value={number}
        onChangeText={(text) => setNumber(text)}
        keyboardType="numeric"
        placeholder="Enter a number"
      />
      <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}/>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{"Checkout"}</Text>
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
  });

export default Checkout;