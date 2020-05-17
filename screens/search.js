import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import { useQuery } from '@apollo/react-hooks';
import Autocomplete from 'react-native-autocomplete-input'

import gql from 'graphql-tag'

const GQL_SEARCH = gql`
query search($patientName:String){
  search(name:$patientName) {
    _id
    name
 }
}`

const search = ({ navigation }) =>
{

   


    const [searchText, setSearchText] = useState("")
    const [options, setOptions] = useState([]);
    const { loading, error } = useQuery(GQL_SEARCH, {
        variables: {
            patientName: searchText
        },
        onCompleted: data =>
        {

            setOptions(data.search)

        }
    })

    return (
        <View style={styles.autocompleteContainer}>
            <Autocomplete

                style={styles.searchText}
                data={options}
                placeholder="Patient Name"
                defaultValue=""
                onChangeText={text => setSearchText(text)}
                renderItem={({ item, i }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Photo', item)}>
                        <Text style={styles.searchResults} >{item.name}</Text>

                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />

           

        </View>
    )
}

export default search

const styles = StyleSheet.create({
    autocompleteContainer: {




        margin: 20,
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    },
    searchText: {
        height: 40,
        direction: 'rtl',
        paddingLeft: 10,
        paddingRight: 10
    },
    searchResults: {

        margin: 3,
        fontWeight: 'bold'
    }




})
