import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { deleteOrder, getOrderItem } from '../../api';
const OrderDetails = ({route, navigation}) => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [orderId, setOrderId] = useState("");

  var ids = "";

    const dispatch = useDispatch();
    const baseUrl = 'http://localhost:3100';

    useEffect(() => {
      const data = route.params.data;
      ids = data.id
      fetchDonutsData();
    }, [route.params.data]); 

    useEffect(() => {
      const orderNamesArray = orderData.map(item => item.order.name);
      setName(orderNamesArray[0])
      const orderIds = orderData.map(item => item.orderId);
      setOrderId(orderIds[0])
    }, [orderData]); 

    const fetchDonutsData = async () => {
      if (ids) {
        var response = await getOrderItem(ids)
        setOrderData(response.data)
        setLoading(false)
        } else {
          console.log('Data is not set yet, cannot make the web call.');
        }
    };

    const renderSectionHeader = ({ section: { name } }) => (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{name}</Text>
      </View>
    );
  
    const renderItem = ({ item }) => (
      <View>
        {(item != null || item != "") ? <Text>{item}</Text> : {}}
      </View>
    );
  
    const sections = orderData.map(item => ({
      name: item.name,
      data: item.toppings
    }));

    console.log(orderData)
      const completeOrder = async () => {
        await deleteOrder(orderId).then(response => {
            console.log(`Deleted order with ID ${id}`);
          })
          .catch(error => {
            console.error(error);
          });
      }
  return (
    <View>
      <Text>OrderDetails</Text>
        <Text>See the details of order</Text>
        <Text> Customer name: {name}</Text>
        {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : orderData ? (
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
        />
      ) : (
        <Text>Data not available</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={completeOrder}>
      <Text style={styles.buttonText}>{"Complete order"}</Text>
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

export default OrderDetails;