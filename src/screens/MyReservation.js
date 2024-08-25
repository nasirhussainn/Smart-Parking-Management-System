import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Navbar from '../components/Navbar';
import WelcomeCard from '../components/WelcomeCard';
import Footer from '../components/Footer';
import IconCard from '../components/IconCard';

const MyReservation = ({ navigation }) => {
  const [reservations, setReservations] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

      const toggleMenu = () => {
          setMenuOpen(!menuOpen);
      };

  useEffect(() => {
    // fetch reservations from API or database
    setReservations([
      {
        id: 1,
        parkingSpaceName: 'Parking Space 1',
        date: '2023-02-20',
        status: 'Pending',
      },
      {
        id: 2,
        parkingSpaceName: 'Parking Space 2',
        date: '2023-02-21',
        status: 'Successful',
      },
      {
        id: 3,
        parkingSpaceName: 'Parking Space 3',
        date: '2023-02-22',
        status: 'Pending',
      },
    ]);
  }, []);

  return (
   <View style={styles.container}>
              {/* Navigation Bar */}
              <Navbar toggleMenu={toggleMenu} />

    <ScrollView style={styles.container}>
      <WelcomeCard toggleMenu={toggleMenu} menuOpen={menuOpen} navigation={navigation} />

      <Text style={styles.title}>My Reservation</Text>
      <View style={styles.card}>
        <FlatList
          data={reservations}
          renderItem={({ item, index }) => (
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>
                {index + 1}. {item.parkingSpaceName} - {item.date} - {item.status}
              </Text>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

    </ScrollView>
    <IconCard/>
    <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  listItemText: {
    fontSize: 16,
    color: 'black',
  },
  viewButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MyReservation;