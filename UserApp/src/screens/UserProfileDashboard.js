import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import axios from 'axios';

import Navbar from '../components/Navbar';
import WelcomeCard from '../components/WelcomeCard';
import Footer from '../components/Footer';
import IconCard from '../components/IconCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfileDashboard = ({navigation}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const [reservationRequests, setReservationRequests] = useState([]);
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

    const fetchParkingSpaces = async email => {
      try {
        // Fetch user details
        const response = await axios.get(
          `http://10.141.212.94:8000/api/user/${email}/`,
        );
        setUserDetail(response.data);

        // Fetch parking space data
        const response1 = await axios.get(
          'http://10.141.212.94:8000/parkingspaces/',
        );
        setParkingSpaces(response1.data.slice(0, 2));

        // Fetch reservation requests
        try {
          const response2 = await axios.get(
            `http://10.141.212.94:8000/slot-reservation/user/${response.data.id}/`,
          );

          // Check if the response has data
          if (response2.data && response2.data.length > 0) {
            setReservationRequests(response2.data);
          } else {
            setReservationRequests([]); // Gracefully handle no reservation requests
          }
        } catch (err) {
          // console.error('Error fetching reservation requests:', err);
          setReservationRequests([]); // Gracefully handle API error for reservations
        }

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

      {/* Content */}
      <ScrollView style={styles.scrollContainer}>
        {/* Welcome Card */}
        <WelcomeCard
          toggleMenu={toggleMenu}
          menuOpen={menuOpen}
          navigation={navigation}
        />

        {/* User Detail Card */}
        <View style={[styles.card, styles.detailCard]}>
          <Text style={[styles.cardTitle, styles.cardContent]}>
            User Profile Detail
          </Text>
          <View style={styles.userDetail}>
            <Image
              source={require('../assets/Profile.png')}
              style={styles.profilePicture}
            />
            <View style={styles.userInfo}>
              <Text style={styles.cardContent}>
                Name: {userDetail.username}
              </Text>
              <Text style={styles.cardContent}>Email: {userDetail.email}</Text>
            </View>
          </View>

          {/* <TouchableOpacity
            style={[styles.viewMoreButton, styles.centerButton]}>
            <Text
              onPress={() => navigation.navigate('Profile')}
              style={styles.viewButtonText}>
              Update Profile
            </Text>
          </TouchableOpacity> */}
        </View>

        {/* My Parking Spaces Card */}
        <View style={[styles.card, styles.parkingReservationCard]}>
          <Text style={[styles.cardTitle, styles.cardContent]}>
            My Parking Spaces
          </Text>
          <View style={[styles.entryContainer, styles.bottomBorder]}>
            {parkingSpaces.length === 0 ? (
              <Text style={styles.noDataText}>
                No parking spaces available.
              </Text>
            ) : (
              <>
                {parkingSpaces.slice(0, 2).map((space, index) => (
                  <View style={styles.entry} key={space.id}>
                    <Text style={styles.entryNumber}>{index + 1}.</Text>
                    <Text style={styles.entryName}>{space.name}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Parking', {
                          spaceId: space.id,
                          userID: userDetail.id,
                        })
                      }
                      style={styles.viewButton}>
                      <Text style={styles.viewButtonText}>View</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                {/* Show "View More" only when there are more than two spaces */}

                <TouchableOpacity
                  onPress={() => navigation.navigate('MyParkingSpace')}
                  style={[styles.viewMoreButton, styles.centerButton]}>
                  <Text style={styles.viewButtonText}>View More</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Reservation Requests Card */}
        <View style={[styles.card, styles.parkingReservationCard]}>
          <Text style={[styles.cardTitle, styles.cardContent]}>
            Reservation Requests
          </Text>
          <View style={[styles.entryContainer, styles.bottomBorder]}>
            {reservationRequests.length === 0 ? (
              <Text style={styles.noDataText}>
                No reservation requests available.
              </Text>
            ) : (
              <>
                {reservationRequests.slice(0, 2).map((slot, index) => (
                  <View style={styles.entry} key={slot.id}>
                    <Text style={styles.entryNumber}>{index + 1}.</Text>
                    <Text style={styles.entryName}>
                      Reservation ID: {slot.id}
                    </Text>
                    <TouchableOpacity
                      style={styles.viewButton}
                      onPress={() => {
                        navigation.navigate('ViewSlotReservationRequest', {
                          id: slot.id,
                        });
                      }}>
                      <Text style={styles.viewButtonText}>View</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                {/* Show "View More" only when there are more than two requests */}
                {reservationRequests.length > 2 && (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('MyReservation', {
                        slotId: userDetail.id,
                      })
                    }
                    style={[styles.viewMoreButton, styles.centerButton]}>
                    <Text style={styles.viewButtonText}>View More</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
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
  noDataText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default UserProfileDashboard;
