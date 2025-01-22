// components/Footer.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.headerFooter}>
            <Text style={styles.footerText}>© 2024 Smart Parking App</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerFooter: {
        backgroundColor: '#2ecc71',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerText: {
        color: 'white',
    },
});

export default Footer;
