import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import useUserStore from '../../store/useUserStore';
import { login } from '../../api';

interface Props {}

const LoginScreen: React.FC<
    NativeStackScreenProps<RootStackParamList, 'Login'> & Props
> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const saveCustomerToken = useUserStore(state => state.login);
    const { t } = useTranslation();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert(t('common.error'), t('login.fillDetails'));
            return;
        }

        setLoading(true);
        try {
            const response = await login({ email, password });

            if (response.ok && response.data) {
                saveCustomerToken(response.data);
                navigation.navigate('BottomTab', {
                    screen: 'Home',
                });
            } else if(!response.ok){
                throw response.originalError;
            }
        } catch (error: any) {
            Alert.alert(t('login.failedMsg'), error?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('login.title')}</Text>
            <TextInput
                style={styles.input}
                placeholder={t('login.email')}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder={t('login.password')}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}>
                <Text style={styles.buttonText}>
                    {t(loading ? 'login.loginLoadingMsg' : 'login.title')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.signupContainer}
                onPress={() => {
                    navigation.navigate('Signup');
                }}>
                <Text style={styles.signupText}>{t('login.signupMsg')}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    signupContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginBottom: 32,
    },
    signupText: {
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
