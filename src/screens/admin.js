import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Admin = () => {
    
  return (
    <View>
      <Text>Admin</Text>
      <TouchableOpacity style={styles.button} >
      <Text style={styles.buttonText}>{"Admin"}</Text>
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

export default Admin;