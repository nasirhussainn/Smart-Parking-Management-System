import React, {useState} from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InputField = ({ placeholder, iconPath, value, border, onLocationSelection, iconSize=[20,20] }) => {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  return (
    <View style={[styles.searchContainer, {borderWidth: border}, isPressed && { backgroundColor: 'white' }]}>
      <Image
        source={iconPath} // Pass the icon image path as a prop
        style={[styles.searchIcon, {height: iconSize[1], width: iconSize[0]}]}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="black"
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => {setIsPressed(false); navigation.navigate('SearchPlaces', {callback: onLocationSelection})}}
        value={value} // Pass the value from state as a prop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  searchIcon: {
    marginRight: 10,
    tintColor: '#888',
  },
  input: {
    flex: 1,
    padding: 10,
    margin: 0,
    color: 'black',
    fontSize: 20
  },
});

export default InputField