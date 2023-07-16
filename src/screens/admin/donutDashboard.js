import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TouchableOpacity, SectionList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { itemSlice } from '../../store/itemSlice';

const DonutDashboard = ({ navigation }) => {
  const [donutData, setDonutData] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const { showActionSheetWithOptions } = useActionSheet();
    
    useEffect(() => {
      fetchDonutData();
      fetchToppings();
    }, []);

    const fetchDonutData = async () => {
      await axios.get('http://localhost:3100/donut')
          .then(function (response) {
            setDonutData(response.data);
          })
          .catch(function (error) {
            setLoading(false);
          })
    };

    const fetchToppings = async () => {
      await axios.get('http://localhost:3100/topping')
      .then(function (response) {
        console.log("got response from server")
        const sections = [
          {
            title: 'Donuts',
            data: donutData,
          },
          {
            title: 'Topping', 
            data: response.data,
          },
        ];
        setSections(sections);
         setLoading(false);
        console.log(response.data);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      })
    }
    

  const showActionSheet = () => {
    const options = ['Add donut', 'Add topping', 'Cancel'];
    const cancelButtonIndex = 2;
    const handleActionSheetSelection = (buttonIndex) => {
        if (buttonIndex === 0) {
          dispatch(itemSlice.actions.setSelected({id: "", 
            name: "", 
            type: "donut", 
            addEdit: "add"}));
            navigation.navigate('AddEditDonut');
        } else if (buttonIndex === 1) {
          dispatch(itemSlice.actions.setSelected({id: "", 
            name: "", 
            type: "topping", 
            addEdit: "add"}));
          navigation.navigate('AddEditDonut');
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
    
      const handleItemPress = (item, section) => {
        console.log("section here ")
        console.log(section)
        dispatch(itemSlice.actions.setSelected({id: item.id, 
          name: item.name, 
          type: section.title == "Donuts" ? "donut" : "topping", 
          addEdit: "update"}));
        navigation.navigate('AddEditDonut');
      };

      const renderItem = ({ item, section }) => (
        <TouchableOpacity onPress={() => handleItemPress(item, section)} style={styles.itemTouchable}>
        <View style={styles.item}>
          <Text>Name: {item.name}</Text>
        </View>
        </TouchableOpacity>
      );
    
      const renderSectionHeader = ({ section }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
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
        <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
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