import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';

import Navbar from '../components/Navbar';
import WelcomeCard from '../components/WelcomeCard';
import Footer from '../components/Footer';
import IconCard from '../components/IconCard';
import { useNavigation } from '@react-navigation/native';
import ViewSlotReservationRequest from './ViewSlotReservationRequest';

const MyReservation = ({navigation, route}) => {
  const {slotId} = route.params;
  console.log('Slot ID:', slotId);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reservationData, setReservationData] = useState([]);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // Function to fetch Reservation Data
    const fetchReservationData = async () => {
      try {
        const response = await axios.get(
          `http://10.141.212.94:8000/slot-reservation/user/${slotId}`,
        );
        const data = response.data;
        setReservationData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    // Call fetchEmail to start the process
    fetchReservationData();
  }, []);

  const handleViewButtonPress = id => {
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
        <WelcomeCard
          toggleMenu={toggleMenu}
          menuOpen={menuOpen}
          navigation={navigation}
        />
        <Text style={styles.title}>My Reservation</Text>
        <View style={styles.card}>
          <FlatList
            data={reservationData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <View style={styles.listItem}>
                <Text style={styles.listItemText}>
                  Reservation ID: {item.id || 'No Name Available'}
                </Text>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => {
                    navigation.navigate('ViewSlotReservationRequest', {
                      id: item.id,
                    });
                  }}>
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

export default MyReservation;
