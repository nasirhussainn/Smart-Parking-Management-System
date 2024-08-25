// components/BookingRequest.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import Navbar from '../components/Navbar';
import WelcomeCard from '../components/WelcomeCard';
import Footer from '../components/Footer';

const BookingRequest = ({ navigation }) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timing, setTiming] = useState({ from: '', to: '' });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [price, setPrice] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleConfirm = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = () => {
    // Add payment submission logic here
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <View style={styles.container}>
      <Navbar toggleMenu={toggleMenu} />
      <WelcomeCard toggleMenu={toggleMenu} menuOpen={menuOpen} navigation={navigation} />
      <Text style={styles.title}>Reservation Request</Text>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.reservationCard}>
          <Text style={styles.reservationTitle}>Reservation Details</Text>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date</Text>
              <TextInput
                style={styles.input}
                placeholder="Select Date"
                value={date.toLocaleDateString()}
                onPressIn={() => setShowDatePicker(true)}
              />
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  locale="en_US"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    setDate(selectedDate);
                  }}
                />
              )}
            </View>
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>From</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="From"
                    value={timing.from}
                    onPressIn={() => setShowTimePicker(true)}
                  />
                  {showTimePicker && (
                    <DateTimePicker
                      value={timing.from || new Date()}
                      mode="time"
                      display="default"
                      locale="en_US"
                      onChange={(event, selectedTime) => {
                        setShowTimePicker(false);
                        setTiming({ ...timing, from: selectedTime });
                      }}
                    />
                  )}
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>To</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="To"
                    value={(timing.to)}
                    onPressIn={() => setShowTimePicker(true)}
                  />
                  {showTimePicker && (
                    <DateTimePicker
                      value={(date) || new Date()}
                      mode="time"
                      display="default"
                      locale="en_US"
                      onChange={(event, selectedTime) => {
                        setShowTimePicker(false);
                        setTiming({ ...timing, to: selectedTime });
                      }}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>

        {showPaymentForm && (
          <View style={styles.paymentCard}>
            <Text style={styles.paymentTitle}>Payment Method</Text>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Price</Text>
                <TextInput
                  style={styles.input}
                  value={price.toString()}
                  editable={false}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Payment Method</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Payment Method"
                  value={paymentMethod}
                  onChangeText={(text) => setPaymentMethod(text)}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handlePaymentSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
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
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      elevation: 5,
    },
    reservationTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'black',
    },
    formContainer: {
      padding: 20,
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
    cardContainer: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      elevation: 5,
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
      backgroundColor: '#fff',
    },
    card: {
      padding: 20,
      borderRadius: 10,
      backgroundColor: '#fff',
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
    paymentCard: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      elevation: 5,
    },
    paymentTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'black',
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
    export default BookingRequest