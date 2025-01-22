import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [isChecked, setIsChecked] = useState(false);

    const validate = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in both email and password');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            Alert.alert('Error', 'Please enter a valid email');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (validate()) {
            try {
                setIsLoading(true);

                const response = await fetch('http://10.141.212.94:8000/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                });

                const result = await response.json();

                if (response.ok) {
                    Alert.alert('Success', 'Login successful!');
                    await AsyncStorage.setItem('userEmail', email);
                    navigation.navigate('UserProfileDashboard');
                } else {
                    Alert.alert('Error', result.message || 'Invalid Credetials, Please try again.');
                }
            } catch (error) {
                Alert.alert('Error', 'An error occurred. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: COLORS.black }}>
                        Hi Welcome 👋
                    </Text>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Login to your account</Text>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Email address</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.grey}
                            keyboardType='email-address'
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Password</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.grey}
                            secureTextEntry={!isPasswordShown}
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                </View>
                {/* <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        onPress={() => setIsChecked(!isChecked)}
                        style={[styles.checkbox, isChecked && { backgroundColor: COLORS.primary }]}
                    >
                        {isChecked && <Ionicons name="checkmark-outline" size={24} color={COLORS.white} />}
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 8, color: 'black' }}>Remember Me</Text>
                </View> */}
                <Button
                    title="Login"
                    filled
                    onPress={handleSubmit}
                    style={{ marginTop: 18, marginBottom: 4 }}
                />
                {isLoading && <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />}
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
};

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
    input: {
        flex: 1,
        height: '100%',
        color: 'black',
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
};

export default Login;
