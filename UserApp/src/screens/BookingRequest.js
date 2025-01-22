// components/BookingRequest.js

import React, {useState, useEffect} from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WelcomeCard from '../components/WelcomeCard';

const BookingRequest = ({navigation, route}) => {
  const {parkingId, userId, price, startHour, endHour} = route.params;
  console.log('userId:', userId);
  console.log('parkingId:', parkingId);
  console.log('type of userId:', typeof userId);

  const [date, setDate] = useState(new Date());
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timePickerType, setTimePickerType] = useState('from');

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  const operatingStartHour = new Date(startHour).getHours();
  const operatingStartMinute = new Date(startHour).getMinutes();
  const operatingEndHour = new Date(endHour).getHours();
  const operatingEndMinute = new Date(endHour).getMinutes();

  const isWithinOperatingHours = (from, to) => {
    const fromHour = from.getHours();
    const fromMinute = from.getMinutes();
    const toHour = to.getHours();
    const toMinute = to.getMinutes();

    const fromIsValid =
      (fromHour > operatingStartHour ||
        (fromHour === operatingStartHour &&
          fromMinute >= operatingStartMinute)) &&
      (fromHour < operatingEndHour ||
        (fromHour === operatingEndHour && fromMinute <= operatingEndMinute));

    const toIsValid =
      (toHour > operatingStartHour ||
        (toHour === operatingStartHour && toMinute >= operatingStartMinute)) &&
      (toHour < operatingEndHour ||
        (toHour === operatingEndHour && toMinute <= operatingEndMinute));

    return fromIsValid && toIsValid;
  };

  const validateBookingDetails = () => {
    if (!fromTime || !toTime) {
      Alert.alert('Error', 'Please select both From and To times.');
      return false;
    }

    const from = new Date(date);
    from.setHours(fromTime.getHours(), fromTime.getMinutes());

    const to = new Date(date);
    to.setHours(toTime.getHours(), toTime.getMinutes());

    if (to <= from) {
      Alert.alert('Error', 'To time must be later than From time.');
      return false;
    }

    if (!isWithinOperatingHours(from, to)) {
      Alert.alert(
        'Invalid Time',
        `Selected times are outside the operating hours. Operating hours are from ${new Date(
          startHour,
        ).toLocaleTimeString()} to ${new Date(endHour).toLocaleTimeString()}.`,
      );
      return false;
    }

    return true;
  };

  const calculatePrice = () => {
    const from = new Date(date);
    from.setHours(fromTime.getHours(), fromTime.getMinutes());

    const to = new Date(date);
    to.setHours(toTime.getHours(), toTime.getMinutes());

    const durationHours = (to - from) / (1000 * 60 * 60); // Convert milliseconds to hours
    setCalculatedPrice((durationHours * price).toFixed(0));
  };

  useEffect(() => {
    if (fromTime && toTime) {
      calculatePrice();
    }
  }, [fromTime, toTime]); // Recalculate price whenever fromTime or toTime change

  const handlePayment = async () => {
    if (!validateBookingDetails()) return;

    if (!userId || !parkingId) {
      Alert.alert('Error', 'User ID and Parking ID are required.');
      return;
    }

    const amount = parseInt(calculatedPrice, 10);
    if (isNaN(amount)) {
      Alert.alert('Error', 'Invalid price value.');
      return;
    }

    try {
      const response = await fetch(
        'http://10.141.212.94:8000/api/slot-reservations/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ParkingID: parkingId,
            UserID: userId,
            starthours: fromTime.toISOString(),
            endhours: toTime.toISOString(),
            amount: amount,
          }),
        },
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        Alert.alert('Success', 'Payment submitted successfully!');
        navigation.navigate('UserProfileDashboard');
      } else {
        const errorMessage = data?.message || 'An unexpected error occurred.';
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      console.error('Payment submission error:', error);
      Alert.alert(
        'Error',
        'Failed to connect to the server. Please try again later.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <WelcomeCard navigation={navigation} />
      <Text style={styles.title}>Reservation Request</Text>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.reservationCard}>
          <Text style={styles.reservationTitle}>Reservation Details</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date</Text>
            <TextInput
              style={styles.input}
              value={date.toLocaleDateString()}
              onPressIn={() => setShowDatePicker(true)}
            />
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                minimumDate={today}
                maximumDate={maxDate}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDate(selectedDate);
                }}
              />
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>From</Text>
            <TextInput
              style={styles.input}
              value={
                fromTime
                  ? fromTime.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : ''
              }
              onPressIn={() => {
                setTimePickerType('from');
                setShowTimePicker(true);
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>To</Text>
            <TextInput
              style={styles.input}
              value={
                toTime
                  ? toTime.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : ''
              }
              onPressIn={() => {
                setTimePickerType('to');
                setShowTimePicker(true);
              }}
            />
          </View>

          {showTimePicker && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) {
                  timePickerType === 'from'
                    ? setFromTime(selectedTime)
                    : setToTime(selectedTime);
                }
              }}
            />
          )}

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handlePayment}>
            <Text style={styles.confirmText}>Proceed to Payment</Text>
          </TouchableOpacity>

          {calculatedPrice > 0 && (
            <View style={styles.paymentContainer}>
              <Text style={styles.priceLabel}>Proceed to Payment</Text>
              <TextInput
                style={styles.priceInput}
                value={`Rs. ${calculatedPrice}`}
                editable={false}
              />

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handlePayment}>
                <Text style={styles.submitText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          )}
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
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  reservationCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    elevation: 5,
  },
  reservationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: 'black',
  },
  confirmButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  priceLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  priceInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: 'black',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookingRequest;
