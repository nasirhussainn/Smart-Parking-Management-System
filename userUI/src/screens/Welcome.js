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
        <Text style={styles.title}>Let's Get</Text>
        <Text style={styles.subtitle}>Started</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Smart Parking System
          </Text>
          <Text style={styles.description}>
            Park your vehicle at your desire spot!
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
    paddingTop: 400,
    width: '100%',
    position: 'relative',
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
