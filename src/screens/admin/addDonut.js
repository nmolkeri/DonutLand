import React, { useState, useEffect }  from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Donut from '../../model/donut';
import { generateUUID } from '../../utils';
import axios from 'axios';

const AddEditDonut = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [type, setType] = useState('');
  const [updateAdd, setUpdateAdd] = useState('');

  const baseUrl = 'http://localhost:3100';
  const userId = '123';

  useEffect(() => {
    const data = route.params.data;

    if(data.itemName == '' && data.id == ''){
      setUpdateAdd("Add");
    } else {
      setUpdateAdd("Update")
    }

    setName(data.itemName);
    setId(data.id);
    console.log("hello there")
    console.log(data.type)
    setType(data.type);
  }, [route.params.data]);

  const handleInputChange2 = (text) => {
    setName(text);
  };


  const sendDataToAPI = async (data) => {
    try {
      const apiUrl = `${baseUrl}/${type}`;
      if(updateAdd == "Add") {
        await axios.post(apiUrl, data);
      } else if (updateAdd == "Update") {
        var ap = `${apiUrl}/${id}`
        console.log(ap)
       const response = await axios.patch(ap, data);
       console.log(response.data);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const deleteItem = async () => {
    
      const apiUrl = `${baseUrl}/${type}`;
      var ap = `${apiUrl}/${id}`
      console.log(ap)
      await axios.delete(ap).then(response => {
        console.log(`Deleted post with ID ${id}`);
      })
      .catch(error => {
        console.error(error);
      });;
  };

  const handleSubmit = () => {
    const data = {
        id: id == '' ? generateUUID(32) : id,
        name: name,
      };
      sendDataToAPI(data);

    navigation.goBack();
  };

  const display = updateAdd == "Update" ? "flex" : "none";

  return (
    <View style={styles.container}>
       
      <Text style={styles.header}>Donut name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={handleInputChange2}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>{updateAdd}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={deleteItem} 
        style={[styles.button, {display}]}>
        <Text style={styles.buttonText}>Delete</Text>
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
      marginVertical: 20
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
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
  });

export default AddEditDonut;