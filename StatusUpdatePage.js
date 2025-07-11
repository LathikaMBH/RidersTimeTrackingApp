// SecondPage.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const StatusUpdatePage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the Second Page!</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.goBack()} // Go back to previous page
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StatusUpdatePage;