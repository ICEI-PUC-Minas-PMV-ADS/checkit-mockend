import React from 'react'
import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native";

const Input = (props) => {
  return (
    <TextInput     
      style={styles.input}      
      mode="outlined"
      {...props}      
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 43,
    fontSize: 16,
    backgroundColor: "#FFFAFA",
   
  
  
  }
});

export default Input;