// components/ParkingSpaceRegistration.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Navbar from '../components/Navbar';
import WelcomeCard from '../components/WelcomeCard';
import Footer from '../components/Footer';
import IconCard from '../components/IconCard';

const ParkingSpaceRegistration = (navigation) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState('');
  const [uniqueIdentity, setUniqueIdentity] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

      const [menuOpen, setMenuOpen] = useState(false);

      const toggleMenu = () => {
          setMenuOpen(!menuOpen);
      };


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', { name, email, contact, role, uniqueIdentity });
  };

  return (

     <View style={styles.container}>
     <Navbar toggleMenu={toggleMenu} />
    <ScrollView style={styles.container}>

<WelcomeCard toggleMenu={toggleMenu} menuOpen={menuOpen} navigation={navigation} />
      <View style={styles.header}>
        <Text style={styles.spaceName}>Parking Space Name</Text>
        <Text style={styles.description}>Description about the organization</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.additionalDetails}>Location: Lahore, Pakistan</Text>
          <TouchableOpacity style={styles.viewOnMapButton}>
            <Text style={styles.viewOnMapText}>View on Map</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.additionalDetails}>Charges: 100 PKR/hour</Text>
        <Text style={styles.additionalDetails}>Operating Hours: 9am - 5pm</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.input}
          placeholder="Contact"
          value={contact}
          onChangeText={setContact}
          placeholderTextColor="black"
        />
        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
          <Text style={styles.dropdownText}>{selectedRole || 'Select Role'}</Text>
        </TouchableOpacity>
        {dropdownOpen && (
          <View style={styles.dropdownOptions}>
            <TouchableOpacity onPress={() => { setSelectedRole('Admin'); toggleDropdown(); }}>
              <Text style={styles.dropdownOption}>Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setSelectedRole('Moderator'); toggleDropdown(); }}>
              <Text style={styles.dropdownOption}>Moderator</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setSelectedRole('User'); toggleDropdown(); }}>
              <Text style={styles.dropdownOption}>User</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setSelectedRole('Guest'); toggleDropdown(); }}>
              <Text style={styles.dropdownOption}>Guest</Text>
            </TouchableOpacity>
          </View>
        )}
        <TextInput
          style={styles.input}
          placeholder="Unique identity (if any)"
          value={uniqueIdentity}
          onChangeText={setUniqueIdentity}
          placeholderTextColor="black"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    <Footer/>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginBottom: 20,
  },
  spaceName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    padding: 10,

  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black'
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewOnMapButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewOnMapText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  additionalDetails: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black'
  },
  form: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#2ecc71',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
    placeholderTextColor: 'black'
  },
   dropdown: {
     borderWidth: 1,
     borderColor: '#2ecc71',
     borderRadius: 5,
     padding: 10,
     marginBottom: 10,
   },
   dropdownText: {
     color: 'black',
     fontSize: 16,
   },
   dropdownOptions: {
     position: 'absolute',
     top: 50,
     left: 0,
     right: 0,
     backgroundColor: 'white',
     borderColor: '#2ecc71',
     borderWidth: 1,
     borderRadius: 5,
     padding: 10,
   },
   dropdownOption: {
     fontSize: 16,
     padding: 10,
     color: 'black'
   },
   submitButton: {
     backgroundColor: '#2ecc71',
     padding: 15,
     borderRadius: 5,
     alignItems: 'center',
   },
   submitButtonText: {
     color: 'white',
     fontSize: 16,
     fontWeight: 'bold',
   },
 });

 export default ParkingSpaceRegistration;