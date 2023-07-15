import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import axios from 'axios';

const DonutDashboard = ({ navigation }) => {
  const [donutData, setDonutData] = useState(null);
  const [loading, setLoading] = useState(true);
    const { showActionSheetWithOptions } = useActionSheet();
    
    useEffect(() => {
      fetchDonutData();
    }, []);

    const fetchDonutData = async () => {
      try {
        const response = await axios.get('http://localhost:3100/donut');
        setDonutData(response.data);
        console.log(donutData)
        setLoading(false);
        console.log("fetcvhiong donuts")
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

  const showActionSheet = () => {
    const options = ['Add donut', 'Add topping', 'Cancel'];
    const cancelButtonIndex = 2;
    const handleActionSheetSelection = (buttonIndex) => {
        if (buttonIndex === 0) {
            navigation.navigate('AddEditDonut');
        } else if (buttonIndex === 1) {
          navigation.navigate('AddEditTopping');
        }
      };

    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    }, handleActionSheetSelection);
  }
  
    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Button onPress={showActionSheet} title="Add" />
          ),
        });
      }, [navigation]);
    
      const renderDonut = ({ donut }) => (
        console.log(donut)
        // <View style={styles.item}>
        //   <Text>ID: {donut.id}</Text>
        //   <Text>Name: {donut.name}</Text>
        // </View>
      );

  return (
    <View style={styles.container}>
      <Text>Donut dashboard</Text>
        <Text>Add section to display donuts</Text>
        <Text>Add section to display toppings list</Text>
        <Text>right top button to add donut or topping</Text>
        <Text>Add, edit or sold out option for donut and topping</Text>
        {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : donutData ? (
        <FlatList
          data={donutData}
          renderItem={renderDonut}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Data not available</Text>
      )}
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
    headerButton: {
        marginRight: 10,
        paddingHorizontal: 10,
      },
      headerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      item: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      },
  });

export default DonutDashboard;