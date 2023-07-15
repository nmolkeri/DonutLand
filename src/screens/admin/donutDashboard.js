import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';

const DonutDashboard = ({ navigation }) => {

    const { showActionSheetWithOptions } = useActionSheet();

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
    
  return (
    <View style={styles.container}>
      <Text>Donut dashboard</Text>
        <Text>Add section to display donuts</Text>
        <Text>Add section to display toppings list</Text>
        <Text>right top button to add donut or topping</Text>
        <Text>Add, edit or sold out option for donut and topping</Text>
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
  });

export default DonutDashboard;