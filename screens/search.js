import React from 'react'
import { StyleSheet, Text, View , Button } from 'react-native'

const search = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text> search  </Text>
            <Button title = "goTo photo" onPress={()=>{
                navigation.navigate('Photo');
            }}/>
        </View>
    )
}

export default search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
})
