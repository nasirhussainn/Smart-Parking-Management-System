// components/IconCard.js

import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const IconCard = () => {

const navigation = useNavigation();
    return (
        <View style={styles.iconCard}>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("UserProfileDashboard")} style={styles.iconButton}>
                    <Image source={require('../assets/dashboard_icon.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.iconButton}>
                    <Image source={require('../assets/profile_icon.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("MyParkingSpace")}  style={styles.iconButton}>
                    <Image  source={require('../assets/parking_space_icon.png')} style={styles.icon} />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => navigation.navigate("MyReservation")} style={styles.iconButton}>
                    <Image source={require('../assets/reservation_icon.png')} style={styles.icon} />
                </TouchableOpacity> */}
                {/* <TouchableOpacity style={styles.iconButton}>
                    <Image source={require('../assets/setting_icon.png')} style={styles.icon} />
                </TouchableOpacity> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    iconCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 9,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#2ecc71',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconButton: {
        alignItems: 'center',
    },
});

export default IconCard;
