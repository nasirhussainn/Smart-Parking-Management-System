import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Navbar from '../components/Navbar';
import WelcomeCard from '../components/WelcomeCard';
import Footer from '../components/Footer';
import IconCard from '../components/IconCard';

const MyParkingSpace = ({ navigation }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // Function to fetch email from AsyncStorage
    const fetchEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        if (storedEmail) {
          setEmail(storedEmail);
          // Once the email is fetched, call fetchParkingSpaces with the email
          fetchParkingSpaces(storedEmail);
        } else {
          alert('No user found. Please login again.');
        }
      } catch (error) {
        console.error('Error fetching email:', error);
      }
    };

    // Function to fetch parking spaces data
    const fetchParkingSpaces = async email => {
      try {
        // Use the fetched email to fetch user details
        const response = await axios.get(
          `http://10.141.212.94:8000/api/user/${email}/`,
        );
        setUserDetail(response.data);

        // Fetch additional parking space data
        const response1 = await axios.get(
          'http://10.141.212.94:8000/parkingspaces/',
        );
        setParkingSpaces(response1.data); // Assuming you want to set parking space data here
        console.log('Parking spaces:', response1.data); // Log the parking space data

        setLoading(false);
      } catch (err) {
        console.error('Error fetching parking spaces:', err);
        setError('Failed to load parking spaces');
        setLoading(false);
      }
    };

    // Call fetchEmail to start the process
    fetchEmail();
  }, []);

  const handleViewButtonPress = (id) => {
    // Navigate to the parking space details screen
    console.log('View parking space:', id);
    // You can replace the line above with a navigation action if needed:
    // navigation.navigate('ParkingDetails', { id: id });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading parking spaces...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <Navbar toggleMenu={toggleMenu} />
      <ScrollView style={styles.container}>
        <WelcomeCard toggleMenu={toggleMenu} menuOpen={menuOpen} navigation={navigation} />
        <Text style={styles.title}>My Parking Space</Text>
        <View style={styles.card}>
          <FlatList
            data={parkingSpaces}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.listItem}>

                <Text style={styles.listItemText}>{item.name || 'No Name Available'}</Text>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() =>
                    navigation.navigate('Parking', {spaceId: item.id, userID: userDetail.id})
                  }
                >
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
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
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  listItemText: {
    fontSize: 16,
    color: 'black',
    flex: 1, // Allow text to take up remaining space
  },
  viewButton: {
    backgroundColor: '#2ecc71',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10, // Space between the name and button
  },
  viewButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MyParkingSpace;
