
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import Login from './src/screens/Login';
import Welcome from './src/screens/Welcome';
import Signup from './src/screens/Signup';
import Profile from './src/screens/Profile';
import UserProfileDashboard from './src/screens/UserProfileDashboard';
import ParkingSpaceRegistration from './src/screens/ParkingSpaceRegistration';
import Parking from './src/screens/Parking';
import BookingRequest from './src/screens/BookingRequest';
import MyParkingSpace from './src/screens/MyParkingSpace';
import MyReservation from './src/screens/MyReservation';
import MapScreen from './src/screens/home';

import IconCard from './src/components/IconCard';


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
                                                                     name="IconCard"
                                                                     component={IconCard}
                                                                     options={{
                                                                       headerShown: false
                                                                     }}
                                                                   />
        <Stack.Screen
                  name="UserProfileDashboard"
                  component={UserProfileDashboard}
                  options={{
                    headerShown: false
                  }}
                />
        <Stack.Screen
                          name="Profile"
                          component={Profile}
                          options={{
                            headerShown: false
                          }}
                        />
        <Stack.Screen
                                  name="ParkingSpaceRegistration"
                                  component={ParkingSpaceRegistration}
                                  options={{
                                    headerShown: false
                                  }}
                                />
        <Stack.Screen
                                          name="Parking"
                                          component={Parking}
                                          options={{
                                            headerShown: false
                                          }}
                                        />
        <Stack.Screen
                                                  name="BookingRequest"
                                                  component={BookingRequest}
                                                  options={{
                                                    headerShown: false
                                                  }}
                                                />


          <Stack.Screen
                    name="MyParkingSpace"
                    component={MyParkingSpace}
                          options={{
                               headerShown: false
                                  }}
           />
       <Stack.Screen
                                                                      name="MyReservation"
                                                                      component={MyReservation}
                                                                      options={{
                                                                        headerShown: false
                                                                      }}
                                                                    />
  <Stack.Screen
                    name="MapScreen"
                    component={MapScreen}
                          options={{
                               headerShown: false
                                  }}
           />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
