import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking, 
} from 'react-native';
import Navbar from '../components/Navbar';
import WelcomeCard from '../components/WelcomeCard';
import Footer from '../components/Footer';

const Parking = ({navigation, route}) => {
  const {spaceId, userID} = route.params;
  const [menuOpen, setMenuOpen] = useState(false);
  const [parkingData, setParkingData] = useState(null); // State to store fetched data
  const [detectedVehicle, setDetectedVehicle] = useState([]); // State to store detected vehicle data
  const [loading, setLoading] = useState(true); // To track loading state

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // Fetch data from API when the component mounts
    const fetchParkingData = async () => {
      try {
        const response = await fetch(
          `http://10.141.212.94:8000/api/parking-space/${spaceId}/`,
        );
        const data = await response.json();
        const response1 = await fetch(
          `http://10.141.212.94:8000/api/detected-vehicle/${spaceId}/`,
        );
        const data1 = await response1.json();
        console.log('Parking data:', data1);

        // Assuming the response returns an array of parking spaces, we select the first one for now
        setParkingData(data);
        setDetectedVehicle(
          data1.length > 0 ? data1 : [{total_detected_vehicles: 0}],
        );
        setLoading(false);
      } catch (error) {
        console.error('Error fetching parking data:', error);
        setLoading(false);
        Alert.alert('Error', 'Failed to load parking data.');
      }
    };

    fetchParkingData();
  }, []);

  // Function to open Google Maps with latitude and longitude
  const openGoogleMaps = () => {
    const latitude = parkingData.latitude || 0; // Default to 0 if not provided
    const longitude = parkingData.longitude || 0; // Default to 0 if not provided
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Unable to open Google Maps.');
        }
      })
      .catch(err => console.error('Error opening Google Maps:', err));
  };

  // Render a loading indicator if the data is still loading
  if (loading) {
    return <Text>Loading...</Text>;
  }

  // If parking data is not available, show an error message
  if (!parkingData) {
    return <Text>No parking data available.</Text>;
  }

  return (
    <View style={styles.container}>
      <Navbar toggleMenu={toggleMenu} />
      <WelcomeCard
        toggleMenu={toggleMenu}
        menuOpen={menuOpen}
        navigation={navigation}
      />

      <ScrollView style={styles.scrollContainer}>
        <Image style={styles.image} source={require('../assets/parking.jpg')} />

        <View style={styles.parkingSpaceDetails}>
          <Text style={styles.spaceName}>
            {parkingData.name || 'Parking Space Name'}
          </Text>
          {/* <Text style={styles.description}>{parkingData.description || 'Description about the organization'}</Text> */}
          {/* <Text style={styles.location}>
            Location: {parkingData.latitude}, {parkingData.longitude}
          </Text> */}
          <Text style={styles.operatingHours}>
            Operating Hours:{' '}
            {new Date(parkingData.starthours).toLocaleTimeString()} -{' '}
            {new Date(parkingData.endhours).toLocaleTimeString()}
          </Text>
          <TouchableOpacity style={styles.viewOnMapButton} onPress={openGoogleMaps}>
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
            <Text style={styles.slotValue}>
              {parkingData.total_vehicles || 'N/A'}
            </Text>
          </View>

          <View style={styles.slotCard}>
            <TouchableOpacity style={styles.slotIcon}>
              <Image
                source={require('../assets/free_slot.png')}
                style={styles.slotImage}
              />
            </TouchableOpacity>
            <Text style={styles.slotTitle}>Free Slots</Text>
            <Text style={styles.slotValue}>
              {parkingData.total_vehicles -
                (detectedVehicle[0]?.total_detected_vehicles || 0) || 'N/A'}
            </Text>
          </View>
        </View>

        <View style={styles.reservationCard}>
          <Text style={styles.reservationText}> Reserve a slot</Text>
          <Text style={styles.pricingDetail}>
            Price: Rs. {parkingData.price || 'N/A'}/hour
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BookingRequest', {
                parkingId: parkingData.id,
                userId: userID, // Assuming 'id' is the key for the parking space's ID
                price: parkingData.price,
                startHour: parkingData.starthours,
                endHour: parkingData.endhours // Price of the parking space
              })
            }
            style={styles.reservationButton}>
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
    shadowOffset: {width: 0, height: 2},
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
    shadowOffset: {width: 0, height: 2},
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
