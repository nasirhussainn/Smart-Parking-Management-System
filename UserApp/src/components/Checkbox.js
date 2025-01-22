import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const Checkbox = ({ value, onValueChange, color }) => {
    return (
        <TouchableOpacity onPress={() => onValueChange(!value)}>
            <View style={{
                width: 20,
                height: 20,
                borderWidth: 1,
                borderRadius: 3,
                borderColor: color ? color : '#000',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 5,
            }}>
                {value && <View style={{
                    width: 14,
                    height: 14,
                    backgroundColor: color ? color : '#000',
                    borderRadius: 2,
                }} />}
            </View>
        </TouchableOpacity>
    );
};

export default Checkbox;