//// MapScreen.js
//import React from 'react';
//import { StyleSheet, View } from 'react-native';
//import MapView, { Marker } from 'react-native-maps';
//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//
//const MapScreen = ({ navigation }) => {
//  const [region, setRegion] = React.useState({
//    latitude: 37.78825,
//    longitude: -122.4324,
//    latitudeDelta: 0.0922,
//    longitudeDelta: 0.0421,
//  });
//
//  return (
//    <View style={styles.container}>
//      <GooglePlacesAutocomplete
//        placeholder='Search'
//        onPress={(data, details = null) => {
//          // 'details' is provided when fetchDetails = true
//          const { lat, lng } = details.geometry.location;
//          setRegion({
//            ...region,
//            latitude: lat,
//            longitude: lng,
//          });
//        }}
//        query={{
//          key: 'AIzaSyD6NQgAw8rJbMfkCnYY6Y4zC_2W3ZUIMj8',
//          language: 'en',
//        }}
//        styles={{
//          container: {
//            position: 'absolute',
//            width: '100%',
//            zIndex: 1,
//          },
//          listView: {
//            backgroundColor: 'white',
//          },
//        }}
//      />
//      <MapView
//        style={styles.map}
//        region={region}
//        onRegionChangeComplete={(region) => setRegion(region)}
//      >
//        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
//      </MapView>
//    </View>
//  );
//};
//
//const styles = StyleSheet.create({
//  container: {
//    ...StyleSheet.absoluteFillObject,
//    justifyContent: 'flex-end',
//    alignItems: 'center',
//  },
//  map: {
//    ...StyleSheet.absoluteFillObject,
//  },
//});
//
//export default MapScreen;
