// components/WelcomeCard.js

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeCard = ({ toggleMenu, menuOpen }) => {
const navigation = useNavigation();
    return (
        <View style={styles.welcomeCard}>
            <TouchableOpacity onPress={toggleMenu} style={styles.menuToggle}>
                <Text style={styles.menuToggleText}>☰</Text>
            </TouchableOpacity>
            <Text style={styles.welcomeText}>Welcome User</Text>

            {menuOpen && (
                <View style={styles.sideBar}>
                    <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
                        <Image source={require('../assets/close_icon.png')} style={styles.closeIcon} />
                    </TouchableOpacity>
                    <View style={styles.menu}>
                    <TouchableOpacity onPress={() => navigation.navigate("UserProfileDashboard")} style={styles.menuItem}>
                            <View style={styles.menuItemContent}>
                            <Image source={require('../assets/dashboard_icon.png')} style={styles.menuIcon} />
                                <Text style={styles.menuText}>Dashboard</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.menuItem}>
                            <View style={styles.menuItemContent}>
                                <Image source={require('../assets/profile_icon.png')} style={styles.menuIcon} />
                                <Text style={styles.menuText}>My Profile</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.separator} />
                        <TouchableOpacity onPress={() => navigation.navigate("MyParkingSpace")} style={styles.menuItem}>
                            <View style={styles.menuItemContent}>
                                <Image source={require('../assets/parking_space_icon.png')} style={styles.menuIcon} />
                                <Text style={styles.menuText}>Parking Spaces</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.separator} />
                        {/* <TouchableOpacity onPress={() => navigation.navigate("MyReservation")} style={styles.menuItem}>
                            <View style={styles.menuItemContent}>
                                <Image source={require('../assets/reservation_icon.png')} style={styles.menuIcon} />
                                <Text style={styles.menuText}>My Reservation Request</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.separator} /> */}
                        {/* <TouchableOpacity style={styles.menuItem}>
                            <View style={styles.menuItemContent}>
                                <Image source={require('../assets/history_icon.png')} style={styles.menuIcon} />
                                <Text style={styles.menuText}>History</Text>
                            </View>
                        </TouchableOpacity> */}
                        <View style={styles.separator} />
                        {/* <TouchableOpacity style={styles.menuItem}>
                            <View style={styles.menuItemContent}>
                                <Image source={require('../assets/setting_icon.png')} style={styles.menuIcon} />
                                <Text style={styles.menuText}>Settings</Text>
                            </View>
                        </TouchableOpacity> */}
                        {/* <View style={styles.separator} />
                        <TouchableOpacity style={styles.menuItem}>
                            <View style={styles.menuItemContent}>
                                <Image source={require('../assets/about_icon.png')} style={styles.menuIcon} />
                                <Text style={styles.menuText}>About</Text>
                            </View>
                        </TouchableOpacity> */}
                        <View style={styles.separator} />
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Login")}>
                            <View style={styles.menuItemContent}>
                                <Image source={require('../assets/logout_icon.png')} style={styles.menuIcon} />
                                <Text style={styles.menuText}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    welcomeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 0,
        position: 'relative',
    },
    welcomeText: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
        marginLeft: 10,
    },
    menuToggle: {
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    menuToggleText: {
        color: 'green',
        fontSize: 24,
    },
    sideBar: {
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 200,
        zIndex: 2,
        paddingVertical: 20,
        height: 100,

    },
    closeButton: {
        paddingHorizontal: 10,
        marginBottom: 10,
        alignItems: 'flex-end',
    },
    closeIcon: {
        width: 20,
        height: 20,
    },
    menu: {
        paddingHorizontal: 10,
        backgroundColor: 'white'
    },
    menuItem: {
        paddingVertical: 10,
         backgroundColor: 'white'
    },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#2ecc71',
    },
    menuText: {
        fontSize: 16,
        color: 'black',

    },
    separator: {
        borderBottomColor: '#2ecc71',
        borderBottomWidth: 1,
    },
});

export default WelcomeCard;
