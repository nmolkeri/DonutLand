import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { FlatList } from 'native-base';
import { getTopping } from '../../api';

const CustomizeDonut = ({ navigation }) => {
  const [toppings, setToppings] = useState([]);
  var [toppingsAdded, setToppingsAdded] = useState([]);
  const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() =>{
      fetchToppings();
    }, [])

  const fetchToppings = async () => {
    await getTopping()
    .then(function (response) {
      console.log("got response from server")
      setToppings(response.data);
       setLoading(false);
      console.log(response.data);
    })
    .catch(function (error) {
      setLoading(false);
      console.log(error);
    })
  }

  const handleItemPress = (item) => {
  //  console.log(item)
   
   const itemPresent = toppingsAdded.find((i) => i.id === item.id);

   if(!itemPresent) {
    toppingsAdded.push(item)
   } else {
    toppingsAdded = toppingsAdded.filter(i => i !== item);
   }
    // dispatch(itemSlice.actions.setSelected({id: item.id, 
    //   name: item.name, 
    //   type: section.title == "Donuts" ? "donut" : "topping", 
    //   addEdit: "update"}));
    // navigation.navigate('AddEditDonut', {data: {name: item.name}});
  };

  const addDonutToCart = (item) => {
    dispatch(cartSlice.actions.addItemToCart({id: item.id, name: item.name, amount: 1}));
    navigation.goBack();
      // dispatch(itemSlice.actions.setSelected({id: item.id, 
      //   name: item.name, 
      //   type: section.title == "Donuts" ? "donut" : "topping", 
      //   addEdit: "update"}));
      // navigation.navigate('AddEditDonut', {data: {name: item.name}});
    };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.itemTouchable}>
    <View style={styles.item}>
      <Text>Name: {item.name}</Text>
    </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text>Customize Donut</Text>
      <Text>Show donut details if available</Text>
      <Text>Limit only 3 toppings</Text>
      <Text>Show sold out if sold out</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : toppings ? (
        <FlatList
        data={toppings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      ) : (
        <Text>Data not available</Text>
      )}
    <TouchableOpacity style={styles.button} onPress={addDonutToCart}>
      <Text style={styles.buttonText}>{"Add donut to cart"}</Text>
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