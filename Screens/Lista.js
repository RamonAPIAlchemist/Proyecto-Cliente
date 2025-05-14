import { View, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';


export default function ClientList() {

    const navigate = useNavigation();
    const handleDelete = (idx) => {
        Alert.alert(
            'Confirmar eliminación de cliente',
            '¿Estás seguro de que quieres eliminar este cliente?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                        const updatedList = [...clients];
                        updatedList.splice(idx, 1);
                        setClients(updatedList);
                    }
                },
            ],
            { cancelable: true }
        );
    }

    const addNewClient = (newClient) => {
        setClients([newClient, ...clients])
    }
    
    const [clients, setClients] = useState([
        {
            idNumber: '1111',
            firstName: 'Juan',
            lastName: 'Pérez',
            birthDate: '01/01/1990',
            gender: 'Masculino'
        },
        {
            idNumber: '2222',
            firstName: 'María',
            lastName: 'Gómez',
            birthDate: '15/05/1985',
            gender: 'Femenino'
        }
    ]);

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.addButton} 
                onPress={() => navigate.navigate('Formulario', { addNewClient })} 
            >
                <FontAwesome5 name="user-plus" size={24} color="black" />
            </TouchableOpacity>
            
            <Text style={styles.title}> Registro de Clientes </Text>

            {clients.length === 0 ? (
                <Text style={styles.emptyMessage}> No hay clientes registrados</Text>
            ) : (
                <ScrollView style={styles.scrollContainer}>
                    {clients.map((client, index) => (
                        <View key={index} style={styles.card}>
                            <TouchableOpacity 
                                style={styles.deleteButton} 
                                onPress={() => handleDelete(index)} 
                            >
                                <FontAwesome5 name="trash" size={20} color="black" />
                            </TouchableOpacity>

                            <Text style={styles.label}> Cédula: 
                                <Text style={styles.value}> {client.idNumber} </Text>
                            </Text>
                            <Text style={styles.label}> Nombre: 
                                <Text style={styles.value}> {client.firstName} </Text>
                            </Text>
                            <Text style={styles.label}> Apellidos: 
                                <Text style={styles.value}> {client.lastName} </Text>
                            </Text>
                            <Text style={styles.label}> Fecha nacimiento: 
                                <Text style={styles.value}> {client.birthDate} </Text>
                            </Text>
                            <Text style={styles.label}> Género: 
                                <Text style={styles.value}> {client.gender} </Text>
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E6F7E6',
    },
    title: {
        fontSize: 25,
        paddingBottom: 10,
        fontWeight: 'bold',
        color: '#4F8B2E',
        paddingTop: 20
    },
    card: {
        height: 140,
        width: 360,
        backgroundColor: '#C2E8C2',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 10,
        position: 'relative',
        paddingHorizontal: 10
    },
    label: {
        color: '#000000',
        marginLeft: 5,
        paddingTop: 2,
        fontSize: 15
    },
    value: {
        color: '#358B47',
        fontWeight: '500'
    },
    addButton: {
        height: 50,
        backgroundColor: '#E6F7E6',
        width: 50,
        borderRadius: 10,
        borderColor: '#4F8B2E',
        borderWidth: 1,
        marginLeft: 300,
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
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyMessage: {
        fontSize: 18,
        color: '#666',
        marginTop: 20
    },
    scrollContainer: {
        width: '100%',
        paddingHorizontal: 10
    }
});