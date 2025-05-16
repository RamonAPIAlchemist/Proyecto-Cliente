import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}> Bienvenido </Text>
            <View style={styles.botonContainer}>
                <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Formulario')}>
                    <Text style={styles.texto}>Ir al formulario</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonContainer: {
        margin: 5,
    },
    boton: {
        backgroundColor: '#358B47',
        height: 50,
        width: 350,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,

    },
    texto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    titulo: {
        paddingBottom: 50,
        fontSize: 20,
        fontWeight: 'bold'

    }
    
});
