// components/Navbar.js

import React from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Navbar = ({ toggleMenu }) => {
    return (
        <View style={styles.navBar}>
            <TouchableOpacity onPress={() => navigation.navigate("MapScreen")} style={styles.navBarItem}>
                <Image source={require('../assets/map_icon.png')} style={styles.icon} />
            </TouchableOpacity>
            <View style={styles.searchBar}>
                <TextInput placeholder="Search..." style={styles.input} />
            </View>
            <TouchableOpacity onPress={() => {}} style={styles.navBarItem}>
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
    input: {
        flex: 1,
        fontSize: 11,
        color: 'black'
    },
    icon: {
        width: 24,
        height: 24,
    },
});

export default Navbar;
