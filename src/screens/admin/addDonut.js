import React, { useState }  from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Donut from '../../model/donut';
import { generateUUID } from '../../utils';
import axios from 'axios';

const AddEditDonut = ({ navigation }) => {
  const [donutName, setDonutName] = useState('');

  const handleInputChange2 = (text) => {
    setDonutName(text);
  };


  const sendDataToAPI = async (data) => {
    try {
      const response = await axios.post('http://localhost:3100/donut', data);
      console.log('API response:', response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const handleSubmit = () => {
    const data = {
        id: generateUUID(32),
        name: donutName,
      };
      sendDataToAPI(data);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
       
      <Text style={styles.header}>Donut name</Text>
      <TextInput
        style={styles.input}
        value={donutName}
        onChangeText={handleInputChange2}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
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
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
      },
      button: {
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
  });

export default AddEditDonut;