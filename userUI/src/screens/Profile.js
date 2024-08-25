import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Button } from 'react-native';
//import * as ImagePicker from 'expo-image-picker';

import WelcomeCard from '../components/WelcomeCard';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Profile = (navigation) => {
    const [address, setAddress] = useState('');
    const [cnic, setCnic] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [vehicleNumberPlate, setVehicleNumberPlate] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);

      const [menuOpen, setMenuOpen] = useState(false);

        const toggleMenu = () => {
            setMenuOpen(!menuOpen);
        };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setProfilePhoto(result.uri);
        }
    };

    const saveProfile = () => {
        // Add logic to save the profile information
        console.log('Profile saved');
    };

    return (
        <ScrollView style={styles.container}>
         <Navbar toggleMenu={toggleMenu} />

                        {/* Welcome Card */}
        <WelcomeCard toggleMenu={toggleMenu} menuOpen={menuOpen} navigation={navigation} />
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Complete Your Profile</Text>

                <View style={styles.profileSection}>
                    {profilePhoto ? (
                        <Image source={{ uri: profilePhoto }} style={styles.profilePhoto} />
                    ) : (
                        <Image source={require('../assets/Profile.jpeg')} style={styles.profilePhoto} />
                    )}
                    <TouchableOpacity onPress={pickImage} style={styles.changePhotoButton}>
                        <Text style={styles.changePhotoText}>Change Profile Photo</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    value="Nasir Hussain"
                    editable={false}
                    style={styles.input}
                />
                <TextInput
                    value="nasirhussaintormik@gmail.com"
                    editable={false}
                    style={styles.input}
                />
                <TextInput
                    value="+92 316 5392101"
                    editable={true}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                    style={styles.input}
                />
                <TextInput
                    placeholder="CNIC"
                    value={cnic}
                    onChangeText={setCnic}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Vehicle Model"
                    value={vehicleModel}
                    onChangeText={setVehicleModel}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Vehicle Number Plate"
                    value={vehicleNumberPlate}
                    onChangeText={setVehicleNumberPlate}
                    style={styles.input}
                />

                <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.changePhotoButton}>
                    <Text style={styles.changePhotoText}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    card: {
        borderRadius: 20,
        padding: 15,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
        textAlign: 'center',
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    changePhotoButton: {
        backgroundColor: '#2ecc71',
        padding: 10,
        borderRadius: 5,
    },
    changePhotoText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#2ecc71',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
        placeholderTextColor: 'black',
         color: 'black',
    },

});

export default Profile;
