// UserProfileDashboard.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Navbar from '../components/Navbar';
import WelcomeCard from '../components/WelcomeCard';
import Footer from '../components/Footer';
import IconCard from '../components/IconCard';

const UserProfileDashboard = ({ navigation }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <View style={styles.container}>
            {/* Navigation Bar */}
            <Navbar toggleMenu={toggleMenu} />

            {/* Content */}
            <ScrollView style={styles.scrollContainer}>
                {/* Welcome Card */}
                <WelcomeCard toggleMenu={toggleMenu} menuOpen={menuOpen} navigation={navigation} />

                {/* User Detail Card */}
                <View style={[styles.card, styles.detailCard]}>
                    <Text style={[styles.cardTitle, styles.cardContent]}>User Profile Detail</Text>
                    <View style={styles.userDetail}>
                        <Image source={require('../assets/Profile.jpeg')} style={styles.profilePicture} />
                        <View style={styles.userInfo}>
                            <Text style={styles.cardContent}>Name: Nasir Hussain</Text>
                            <Text style={styles.cardContent}>Email: nasirhussaintormik@gmail.com</Text>
                            <Text style={styles.cardContent}>Contact: +92 316 5392101</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={[styles.viewMoreButton, styles.centerButton]}>
                        <Text onPress={() => navigation.navigate("Profile")} style={styles.viewButtonText}>Update Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* My Parking Spaces Card */}
                <View style={[styles.card, styles.parkingReservationCard]}>
                    <Text style={[styles.cardTitle, styles.cardContent]}>My Parking Spaces</Text>
                    <View style={[styles.entryContainer, styles.bottomBorder]}>
                        <View style={styles.entry}>
                            <Text style={styles.entryNumber}>1.</Text>
                            <Text style={styles.entryName}>Parking Space 1</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("ParkingSpaceRegistration")} style={styles.viewButton}>
                                <Text style={styles.viewButtonText}>View</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.entry}>
                            <Text style={styles.entryNumber}>2.</Text>
                            <Text style={styles.entryName}>Parking Space 2</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Parking")} style={styles.viewButton}>
                                <Text style={styles.viewButtonText}>View</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("MyParkingSpace")} style={[styles.viewMoreButton, styles.centerButton]}>
                        <Text style={styles.viewButtonText}>View More</Text>
                    </TouchableOpacity>
                </View>

                {/* Reservation Requests Card */}
                <View style={[styles.card, styles.parkingReservationCard]}>
                    <Text style={[styles.cardTitle, styles.cardContent]}>Reservation Requests</Text>
                    <View style={[styles.entryContainer, styles.bottomBorder]}>
                        <View style={styles.entry}>
                            <Text style={styles.entryNumber}>1.</Text>
                            <Text style={styles.entryName}>Reservation Request 1</Text>
                            <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate("MyReservation")}>
                                <Text style={styles.viewButtonText}>View</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.entry}>
                            <Text style={styles.entryNumber}>2.</Text>
                            <Text style={styles.entryName}>Reservation Request 2</Text>
                            <TouchableOpacity style={styles.viewButton}>
                                <Text style={styles.viewButtonText}>View</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.viewMoreButton, styles.centerButton]}>
                        <Text style={styles.viewButtonText}>View More</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Icon Card */}
            <IconCard />

            {/* Footer */}
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    scrollContainer: {
        flex: 1,
    },
    card: {
        borderRadius: 20,
        padding: 15,
        marginBottom: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },
    detailCard: {},
    cardContent: {
        color: 'black',
    },
    userDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
    },
    viewMoreButton: {
        backgroundColor: '#2ecc71',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    centerButton: {
        alignSelf: 'center',
    },
    parkingReservationCard: {
        backgroundColor: 'white',
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    bottomBorder: {
        borderBottomColor: '#a9dfbf',
        borderBottomWidth: 2,
        paddingBottom: 10,
        marginBottom: 10,
    },
    entryContainer: {
        paddingBottom: 10,
        marginBottom: 10,
    },
    entry: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    entryNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
        color: '#2ecc71',
    },
    entryName: {
        flex: 1,
        fontSize: 16,
        color: 'black',
    },
    viewButton: {
        backgroundColor: '#2ecc71',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    viewButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default UserProfileDashboard;
