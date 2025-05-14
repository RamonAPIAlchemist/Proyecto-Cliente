import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const nav = useNavigation();

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.headerText}>Bienvenido a la Aplicación</Text>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity 
                    style={styles.mainButton} 
                    onPress={() => nav.navigate('Formulario')}
                >
                    <Text style={styles.buttonLabel}>Acceder al Formulario</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },
    buttonWrapper: {
        margin: 8,
        width: '90%'
    },
    mainButton: {
        backgroundColor: '#2e7d32',
        height: 52,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
    },
    buttonLabel: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 20
    },
    headerText: {
        paddingBottom: 48,
        fontSize: 22,
        fontWeight: '700',
        color: '#333'
    }
});