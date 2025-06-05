import { View, StyleSheet, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';

// Firebase
import { collection, getFirestore, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import appFirebase from "../BasedeDatos/Firebase";
const db = getFirestore(appFirebase);

export default function Lista() {
    const navigation = useNavigation();
    const [clientes, setClientes] = useState([]);
    const [clientesOriginal, setClientesOriginal] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    // 1 Función LeerDatos restaurada
    const LeerDatos = async () => {
        const snapshot = await getDocs(collection(db, "clientes"));
        const datos = snapshot.docs.map(doc => doc.data());
        setClientes(datos);
        setClientesOriginal(datos);
    };

    useEffect(() => {
        LeerDatos();
    }, []);
     
    // 2 Función buscarClientes
    const buscarClientes = (texto) => {
        setBusqueda(texto);
        if (texto === '') {
            setClientes(clientesOriginal);
        } else {
            const textoBusqueda = texto.toLowerCase();
            const resultados = clientesOriginal.filter(cliente => 
                cliente.Ncedula.toLowerCase().includes(textoBusqueda) ||
                cliente.Nnombres.toLowerCase().includes(textoBusqueda) ||
                cliente.Napellidos.toLowerCase().includes(textoBusqueda)
            );
            setClientes(resultados);
        }
    };
     // 3 Función de eliminar cliente
    const eliminar = async (index) => {
        Alert.alert(
            'Confirmar eliminación',
            '¿Estás seguro de que deseas eliminar este cliente?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        try {
                            const clienteAEliminar = clientes[index];
                            await deleteDoc(doc(db, "clientes", clienteAEliminar.Ncedula));
                            await LeerDatos(); // Actualizar lista después de eliminar
                        } catch (error) {
                            console.error("Error al eliminar:", error);
                            Alert.alert("Error", "No se pudo eliminar el cliente");
                        }
                    }
                },
            ]
        );
    }
// 4 Función de guardar cliente
    const guardarNuevo = async (nuevo) => {
        try {
            await setDoc(doc(db, "clientes", nuevo.Ncedula), nuevo);
            await LeerDatos(); // Actualizar lista después de agregar
        } catch (error) {
            console.log("Error al guardar:", error);
            Alert.alert("Error", "No se pudo guardar el cliente");
        }
    }
// 5 Función de actualizar cliente
    const editarCliente = (cliente, index) => {
        navigation.navigate('Formulario', { 
            clienteParaEditar: cliente,
            indiceCliente: index,
            onGuardarEdicion: async (clienteEditado) => {
                try {
                    await setDoc(doc(db, "clientes", clienteEditado.Ncedula), clienteEditado);
                    await LeerDatos(); // Actualizar lista después de editar
                    Alert.alert("Éxito", "Cliente actualizado correctamente");
                } catch (error) {
                    console.error("Error al editar:", error);
                    Alert.alert("Error", "No se pudo actualizar el cliente");
                }
            }
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.botonADD} onPress={() => navigation.navigate('Formulario', { guardarNuevo })} >
                <FontAwesome5 name="user-plus" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.titulo}> Lista de clientes </Text>

            <TextInput
                style={styles.buscador}
                placeholder="🔍 Buscar por cédula, nombre o apellido..."
                placeholderTextColor="#888"
                value={busqueda}
                onChangeText={buscarClientes}
            />

            {clientes.length === 0 ? (
                <Text style={styles.mensaje}> No hay clientes</Text>
            ) : (
                <ScrollView style={styles.scroll}>
                    {clientes.map((cliente, index) => (
                        <View key={index} style={styles.card}>
                            <View style={styles.botonesContainer}>
                                <TouchableOpacity 
                                    style={styles.botonEditar} 
                                    onPress={() => editarCliente(cliente, index)}
                                >
                                    <FontAwesome5 name="edit" size={20} color="black" />
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={styles.botonEliminar} 
                                    onPress={() => eliminar(index)}
                                >
                                    <FontAwesome5 name="trash" size={20} color="black" />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.label}> Cédula: <Text style={styles.valor}> {cliente.Ncedula} </Text> </Text>
                            <Text style={styles.label}> Nombre: <Text style={styles.valor}> {cliente.Nnombres} </Text> </Text>
                            <Text style={styles.label}> Apellidos: <Text style={styles.valor}> {cliente.Napellidos} </Text> </Text>
                            <Text style={styles.label}> Fecha de nacimiento: <Text style={styles.valor}> {cliente.Nfechanac} </Text> </Text>
                            <Text style={styles.label}> Sexo: <Text style={styles.valor}> {cliente.Nsexo} </Text> </Text>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

// Estilos se mantienen igual...
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
        position: 'relative',
        paddingTop: 15,
        paddingHorizontal: 10
    },
    label: {
        color: '#000',
        marginLeft: 10,
        paddingTop: 1,
    },
    valor: {
        color: '#358B47',
        fontWeight: 'bold'
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
    botonesContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
    },
    botonEditar: {
        width: 32,
        height: 32,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonEliminar: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mensaje: {
        fontSize: 18,
        color: '#666',
        marginTop: 20
    },
    scroll: {
        width: '100%',
        paddingHorizontal: 20
    },
    buscador: {
        height: 45,
        width: '90%',
        backgroundColor: '#FFF',
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 15,
        fontSize: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    }
});