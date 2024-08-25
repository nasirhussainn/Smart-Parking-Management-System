import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';

import Navbar from '../components/Navbar';
import WelcomeCard from '../components/WelcomeCard';
import Footer from '../components/Footer';
import IconCard from '../components/IconCard';

const MyParkingSpace = ({ navigation }) => {
  const [parkingSpaces, setParkingSpaces] = useState([]);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // fetch parking spaces from API or database
    setParkingSpaces([
      { id: 1, name: 'Parking Space 1' },
      { id: 2, name: 'Parking Space 2' },
      { id: 3, name: 'Parking Space 3' },
    ]);
  }, []);

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
            renderItem={({ item, index }) => (
              <View style={styles.listItem}>
                <Text style={styles.listItemText}>{index + 1}. {item.name}</Text>
                <TouchableOpacity style={styles.viewButton}>
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

export default MyParkingSpace;