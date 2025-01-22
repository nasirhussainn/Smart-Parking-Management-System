import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ViewSlotReservationRequest = ({ route, navigation }) => {
  const { id } = route.params; // ID passed from MyReservation
  const [reservationDetails, setReservationDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch Reservation Data
    const fetchReservationData = async () => {
      try {
        const response = await axios.get(
          `http://10.141.212.94:8000/api/slot-reservationbyid/${id}`,
        );
        const data = response.data;
        setReservationDetails(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    // Call fetchEmail to start the process
    fetchReservationData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2ecc71" />
        <Text style={styles.loaderText}>Loading reservation details...</Text>
      </View>
    );
  }

  if (!reservationDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to fetch reservation details.</Text>
      </View>
    );
  }

  const { UserID, starthours, endhours, amount, status, ParkingID } = reservationDetails;
  console.log('Reservation Details:', reservationDetails);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservation Details</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>User ID:</Text>
        <Text style={styles.detailValue}>{UserID}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Start Hours:</Text>
        <Text style={styles.detailValue}>{new Date(starthours).toLocaleString()}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>End Hours:</Text>
        <Text style={styles.detailValue}>{new Date(endhours).toLocaleString()}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Amount:</Text>
        <Text style={styles.detailValue}>PKR-{amount}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Status:</Text>
        <Text style={styles.detailValue}>{status}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Parking ID:</Text>
        <Text style={styles.detailValue}>{ParkingID}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  detailValue: {
    fontSize: 16,
    color: 'gray',
  },
});

export default ViewSlotReservationRequest;
