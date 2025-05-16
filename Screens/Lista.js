import { View, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';


export default function Lista() {

    const navigation = useNavigation();
    const eliminar = (index) => {
        Alert.alert(
            'Confirmar aliminacion',
            'Estas seguro de que deseas elimanar este cliente?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                        const nuevaLista = [...clientes];
                        nuevaLista.splice(index, 1);
                        setClientes(nuevaLista);
                    }
                },
            ],
            { cancelable: true }
        );
    }

    const guardarNuevo = (nuevo) => {
        setClientes([nuevo, ...clientes])
    }

    const [clientes, setClientes] = useState([


        {
            Ncedula: '121-190401-1010P',
            Nnombres: 'Arlinton Ramon',
            Napellidos: 'Mayorga Marin',
            Nfechanac: '190401',
            Nsexo: 'Masculino'

        },

        


    ]);




    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.botonADD} onPress={() => navigation.navigate('Formulario', { guardarNuevo })} >

                <FontAwesome5 name="user-plus" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.titulo}> Lista de clientes </Text>

            {clientes.length == 0 ? (
                <Text style={styles.mensaje}> No hay clientes</Text>

            ) : (

                <ScrollView style={styles.scroll}>
                    {clientes.map((clientes, index) => (
                        <View key={index} style={styles.card}>

                            <Text style={styles.label}> Cedula: <Text style={styles.valor}> {clientes.Ncedula} </Text> </Text>

                            <TouchableOpacity style={styles.botone}
                                onPress={eliminar} >
                                <FontAwesome5 name="trash" size={24} color="black" />
                            </TouchableOpacity>

                            <Text style={styles.label}> Nombre: <Text style={styles.valor}> {clientes.Nnombres} </Text> </Text>
                            <Text style={styles.label}> Apellidos: <Text style={styles.valor}> {clientes.Napellidos} </Text> </Text>
                            <Text style={styles.label}> Fecha de nacimiento: <Text style={styles.valor}> {clientes.Nfechanac} </Text> </Text>
                            <Text style={styles.label}> Sexo: <Text style={styles.valor}> {clientes.Nsexo} </Text> </Text>
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#E6F7E6',
    },
    titulo: {
        fontSize: 25,
        paddingBottom: 10,
        fontWeight: 'bold',
        color: '#4F8B2E',
        paddingTop: 20,
    },
    card: {
        height: 130,
        width: 360,
        backgroundColor: '#C2E8C2',
        alignItems: 'left',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 10,
        position: 'relative'
    },
    label: {
        color: '#00000',
        marginLeft: 10,
        paddingTop: 1,

    },
    valor: {
        color: '#358B47'

    },
    botonADD: {
        position: 'absolute',
        top: 5,
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
    botone: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 32,
        height: 32,
    }
});
