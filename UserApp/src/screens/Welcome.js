import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';

// Import COLORS and Button component from other files
import COLORS from '../constants/colors';
import Button from '../components/Button';

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.gradientContainer}>
        {/* Your background gradient effect can be achieved using a combination of colors */}
      </View>
      <View style={styles.contentContainer}>
        {/* Logo Image */}
        <Image
          source={require('../assets/default.png')} // Adjust the path if needed
          style={styles.logo}
        />
        <Text style={styles.title}>Let's Get</Text>
        <Text style={styles.subtitle}>Started</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Smart Parking App for your vehicle
          </Text>
          <Text style={styles.description}>
            Find parking spots near you and save time and money by booking in advance or on the spot.
          </Text>
        </View>
        <Button
          title="Join Now"
          onPress={() => navigation.navigate("Signup")}
          style={styles.button}
        />
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.loginText, styles.loginLink]}>Login</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.primary, // Fallback color
    // Add gradient styles here
  },
  contentContainer: {
    paddingHorizontal: 22,
    paddingTop: 60, // Adjust this value as needed
    width: '100%',
    position: 'relative',
  },
  logo: {
    width: 350, // Adjust width as needed
    height: 150, // Adjust height as needed
    alignSelf: 'center', // Center the logo
    marginBottom: 40, // Add some spacing below the logo
    borderRadius: 75, // Half of the width/height to make it circular
  },
  title: {
    fontSize: 50,
    fontWeight: '800',
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 46,
    fontWeight: '800',
    color: COLORS.white,
  },
  descriptionContainer: {
    marginVertical: 22,
  },
  description: {
    fontSize: 16,
    color: COLORS.white,
    marginVertical: 4,
  },
  button: {
    marginTop: 22,
    width: '100%',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 16,
    color: COLORS.white,
  },
  loginLink: {
    fontWeight: 'bold',
    marginLeft: 4,
  },
});

export default Welcome;
