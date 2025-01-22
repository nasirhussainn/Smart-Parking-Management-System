// components/Navbar.js

import React from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Importing useNavigation hook

const Navbar = ({ toggleMenu }) => {
    const navigation = useNavigation();  // Accessing navigation object using useNavigation hook

    return (
        <View style={styles.navBar}>

            <Text style={styles.app}>SMART PARKING APP</Text>
            {/* Navigate to MapScreen
            <TouchableOpacity onPress={() => navigation.navigate("MapScreen")} style={styles.navBarItem}>
                <Image source={require('../assets/map_icon.png')} style={styles.icon} />
            </TouchableOpacity> */}
            
            {/* Search Bar */}
            {/* <View style={styles.searchBar}>
                <TextInput placeholder="Search..." style={styles.input} />
            </View> */}
            
            {/* Navigate to Login */}
            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.navBarItem}>
                <Image source={require('../assets/logout_icon.png')} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2ecc71',
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    navBarItem: {
        padding: 10,
    },
    searchBar: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 35,
        height: 40,
        marginLeft: 10,
        marginRight: 10,
    },
    app:{
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    input: {
        flex: 1,
        fontSize: 11,
        color: 'black',
    },
    icon: {
        width: 24,
        height: 24,
    },
});

export default Navbar;
