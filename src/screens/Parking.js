// components/Parking.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';

import Navbar from '../components/Navbar';
import WelcomeCard from '../components/WelcomeCard';
import Footer from '../components/Footer';

const Parking = ({ navigation }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <View style={styles.container}>
      <Navbar toggleMenu={toggleMenu} />
      <WelcomeCard toggleMenu={toggleMenu} menuOpen={menuOpen} navigation={navigation} />

      <ScrollView style={styles.scrollContainer}>

        <Image
          style={styles.image}
          source={require('../assets/parking.jpg')}
        />

        <View style={styles.parkingSpaceDetails}>
          <Text style={styles.spaceName}>Parking Space Name</Text>
          <Text style={styles.description}>Description about the organization</Text>
          <Text style={styles.location}>Location: Lahore, Pakistan</Text>
          <Text style={styles.operatingHours}>Operating Hours: 9am - 5pm</Text>
          <TouchableOpacity style={styles.viewOnMapButton}>
            <Text style={styles.viewOnMapText}>View on Map</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.slotCardsContainer}>
          <View style={styles.slotCard}>
                  <TouchableOpacity style={styles.slotIcon}>
                                <Image
                                  source={require('../assets/total_slot.png')}
                                  style={styles.slotImage}
                                />
                              </TouchableOpacity>
                    <Text style={styles.slotTitle}>Total Slots</Text>
                    <Text style={styles.slotValue}>100</Text>

                  </View>

          <View style={styles.slotCard}>
           <TouchableOpacity style={styles.slotIcon}>
                        <Image
                          source={require('../assets/free_slot.png')}
                          style={styles.slotImage}
                        />
                      </TouchableOpacity>
            <Text style={styles.slotTitle}>Free Slots</Text>
            <Text style={styles.slotValue}>50</Text>

          </View>

        </View>

        <View style={styles.reservationCard}>
          <Text style={styles.reservationText}> Reserve a slot</Text>
          <Text style={styles.pricingDetail}>Price: Rs. 100/hour</Text>
          <TouchableOpacity onPress={() => navigation.navigate("BookingRequest")}   style={styles.reservationButton}>
            <Text style={styles.reservationButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  parkingSpaceDetails: {
    padding: 20,
  },
  spaceName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  location: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  operatingHours: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
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
  image: {
    width: '100%',
    height: 200,
  },
  slotCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  slotCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 5,
  },
  slotTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  slotValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  slotIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotImage: {
    width: 20,
    height: 20,
  },
   reservationCard: {
     backgroundColor: 'white',
     padding: 20,
     borderRadius: 10,
     shadowColor: 'black',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.5,
     elevation: 5,
     marginTop: 20,
   },
   reservationText: {
     fontSize: 18,
     fontWeight: 'bold',
     marginBottom: 10,
     color: 'black',
   },
   pricingDetail: {
     fontSize: 16,
     marginBottom: 10,
     color: 'black',
   },
   reservationButton: {
     backgroundColor: '#2ecc71',
     padding: 15,
     borderRadius: 5,
     alignItems: 'center',
   },
   reservationButtonText: {
     color: 'white',
     fontSize: 18,
     fontWeight: 'bold',
   },
 });

 export default Parking;