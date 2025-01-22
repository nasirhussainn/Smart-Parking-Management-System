import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import Checkbox from '../components/Checkbox'; // Assuming you have a Checkbox component
import Button from '../components/Button'; // Assuming you have a Button component

const Signup = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        let valid = true;
        let errors = {};

        if (!username.trim()) {
            errors.username = 'Username is required';
            valid = false;
        }
        if (!email.trim()) {
            errors.email = 'Email address is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email address is invalid';
            valid = false;
        }
        if (!password) {
            errors.password = 'Password is required';
            valid = false;
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
            valid = false;
        }
        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
            valid = false;
        }
        // if (!isChecked) {
        //     errors.isChecked = 'You must agree to the terms and conditions';
        //     valid = false;
        // }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = async () => {
        if (validate()) {
            try {
                const response = await fetch('http://10.141.212.94:8000/signup/', {  // Use local IP if testing locally
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password,
                        confirm_password: password,  // Include confirm_password
                    }),
                });
    
                const result = await response.json();
    
                if (response.ok) {
                    Alert.alert('Success', 'Your account has been created successfully!');
                    navigation.navigate('Login');
                } else {
                    Alert.alert('Error', result.message || 'Make sure you have not already registered with this email.');
                }
            } catch (error) {
                Alert.alert('Error', 'An error occurred. Please try again.');
            }
        } else {
            Alert.alert('Error', 'Please fix the errors before submitting');
        }
    };
    

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: COLORS.black }}>
                        Create Account
                    </Text>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>
                        Start your Smart Parking journey today!
                    </Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>Username</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Enter your username'
                            placeholderTextColor='black'
                            style={styles.input}
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>
                    {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>Email address</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>Password</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{ position: 'absolute', right: 12 }}
                        >
                            <Text>{isPasswordShown ? 'Hide' : 'Show'}</Text>
                        </TouchableOpacity>
                    </View>
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: '400', marginVertical: 8 }}>Confirm Password</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Confirm your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            style={styles.input}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{ position: 'absolute', right: 12 }}
                        >
                            <Text>{isPasswordShown ? 'Hide' : 'Show'}</Text>
                        </TouchableOpacity>
                    </View>
                    {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                </View>
                {errors.isChecked && <Text style={styles.errorText}>{errors.isChecked}</Text>}

                <Button
                    title="Sign Up"
                    filled
                    style={{ marginTop: 18, marginBottom: 4 }}
                    onPress={handleSubmit}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View style={styles.divider} />
                    <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
                    <View style={styles.divider} />
                </View>

                <View style={styles.bottomTextContainer}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ fontSize: 16, color: COLORS.primary, fontWeight: 'bold', marginLeft: 6 }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = {
    inputContainer: {
        width: '100%',
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 12,
    },
    input: {
        flex: 1,
        height: '100%',
        color: 'black',
    },
    errorText: {
        color: 'red',
        marginTop: 4,
    },
    socialButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 52,
        borderWidth: 1,
        borderColor: COLORS.grey,
        marginRight: 4,
        borderRadius: 10,
    },
    socialIcon: {
        height: 36,
        width: 36,
        marginRight: 8,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.grey,
        marginHorizontal: 10,
    },
    bottomTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 22,
    },
};

export default Signup;
