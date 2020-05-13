import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { render } from 'react-dom';


export default function App() {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  
    
  return (
    <View style={styles.container}>
    <SearchBar
    placeholder="Type Here..."
    onChangeText={this.updateSearch}
   
  />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
