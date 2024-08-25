import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';
//import { Ionicons } from 'react-native-vector-icons';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';

const Login = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: COLORS.black }}>
                        Hi Welcome Back ! 👋
                    </Text>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Hello again you have been missed!</Text>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Email address</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={{ flex: 1 }}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Password</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            style={{ flex: 1 }}
                        />
                    </View>
                </View>
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        onPress={() => setIsChecked(!isChecked)}
                        style={[styles.checkbox, isChecked && { backgroundColor: COLORS.primary }]}
                    >
                        {isChecked && <Ionicons name="checkmark-outline" size={24} color={COLORS.white} />}
                    </TouchableOpacity>
                   <Text style={{ marginLeft: 8, color: 'black' }}>Remember Me</Text>
                </View>
                <Button
                    title="Login"
                    filled
                    onPress={() => navigation.navigate("UserProfileDashboard")}
                    style={{ marginTop: 18, marginBottom: 4 }}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: COLORS.grey, marginHorizontal: 10 }} />
                    <Text style={{ fontSize: 14 }}>Or Login with</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: COLORS.grey, marginHorizontal: 10 }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 22 }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account ? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={{ fontSize: 16, color: COLORS.primary, fontWeight: 'bold', marginLeft: 6 }}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = {
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 22,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.grey,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
            flex: 1,
            height: '100%',
            color: 'black',
    },
};

export default Login;
