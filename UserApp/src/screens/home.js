import { Platform, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker,Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS} from 'react-native-permissions';
import SplashScreen from 'react-native-splash-screen'
import InputField from './InputField';

const API_KEY = 'AIzaSyD6NQgAw8rJbMfkCnYY6Y4zC_2W3ZUIMj8';

const MapScreen = () => {
  const [origin, setOrigin] = useState({placeId: '', placeName: '', coords: null});
  const [destination, setDestination] = useState({placeId: '', placeName: '', coords: null});
  const [initialRegion, setInitialRegion] = useState({
    latitude: 33.6956962780534,
    longitude: 73.02698497120006,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  const mapRef = useRef(null);
  useEffect(() => {
    if (Platform.OS == 'android') {
      SplashScreen.hide();
    }
  }, []);

  const handleMapReady = () => {
    try {
      const result = request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );

      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            // Set the initial region to the user's current location
            setInitialRegion({
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
        },
    error => console.log(error),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
      } else {
        // Permission denied
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const animateMap = (coordinate, delta) => {
    mapRef.current.animateToRegion({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: delta,
      longitudeDelta: delta,
    });
  }

  const fitToCoordinates = (coordinate1, coordinate2) => {
    mapRef.current.fitToCoordinates([coordinate1, coordinate2], {
      edgePadding: { top: 0, right: 0, bottom: -200, left: 0 },
      animated: true,
    });
};

  return (
    <View style={styles.container}>
      {/* Input fields */}
      <View style={styles.inputContainer}>
        <InputField
        placeholder=" Current Location"
        iconPath={require('../icons/location-icon.png')}
        onLocationSelection={(locObj) => {setOrigin(locObj)}}
        value={origin.placeName}
        border={0}
        iconSize={[20,25]}
      />
        <InputField
        placeholder="Search Destination here..."
        iconPath={require('../icons/search-location.png')}
        onLocationSelection={(locObj) => {setDestination(locObj)}}
        value={destination.placeName}
        border={5}
      />
      </View>

      {/* Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        onMapReady={handleMapReady}
        scrollEnabled={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapPadding={{
          top: 200,
          right: 0,
          bottom: 250,
          left: 0
        }}
        loadingEnabled={true}
        zoomEnabled={true}
        pointerEvents='none'
      >

        {/* Marker (trip starting point) */}
        {origin.coords &&
          <Marker
          coordinate={{
            latitude: origin.coords.lat,
            longitude: origin.coords.lng,
          }}
          title="Trip starts from here."
          pinColor="blue"
        />
        }
        {origin.coords && !destination.coords &&
          animateMap({latitude: origin.coords.lat, longitude: origin.coords.lng}, delta=0.01)
        }

        {/* Marker (trip ending point) */}
        {destination.coords &&
          <Marker
          coordinate={{
            latitude: destination.coords.lat,
            longitude: destination.coords.lng,
          }}
          title="Trip ends here"
          pinColor="red"
        />}
        {destination.coords && !origin.coords &&
          animateMap({latitude: destination.coords.lat, longitude: destination.coords.lng}, delta=0.01)
        }

        {/* Fit both origion and destination markers in map screen */}
        {origin.coords && destination.coords &&
          fitToCoordinates({latitude: origin.coords.lat, longitude: origin.coords.lng}, {latitude: destination.coords.lat, longitude: destination.coords.lng})
        }
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 0,
  },
  inputContainer: {
    position: 'absolute',
    zIndex: 1, width: '100%',
    padding: 10,
    backgroundColor: 'rgba(2, 204, 254, 0.6)',
    borderRadius: 20,
    marginTop: 55,
  },
  mainBoxContainer: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 300,
    width: '100%',

  },
  map: {
    flex: 50, 
    marginBottom: 0,
    borderRadius: 10,
    overflow: 'hidden',
  }
});

export default MapScreen;