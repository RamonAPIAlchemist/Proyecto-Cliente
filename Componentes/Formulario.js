import { Text, View, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { Picker } from '@react-native-picker/picker';



function Formulario({ route, navigation }) {
  const { guardarNuevo } = route.params;
  const [cedula, setCedula] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [fechaNacimiento, SetFechaNacimiento] = useState('');
  const [sexo, setSexo] = useState('');

  const guardar = () => {
    if (!cedula || !nombres,
      !apellidos,!fechaNacimiento,!sexo 

    ) return null;
    const nuevoCliente = {
      Ncedula: cedula,
      Nnombres: nombres,
      Napellidos: apellidos,
      Nfechanac: fechaNacimiento,
      Nsexo: sexo,
    }


    guardarNuevo(nuevoCliente);
    Alert.alert('Datos almacenados', `
    Cédula: ${cedula}
    Nombres: ${nombres}
    Apellidos: ${apellidos}
    Fecha Nacimiento: ${fechaNacimiento}
    Sexo: ${sexo}
`
    );

    setCedula('');
    setNombres('');
    setApellidos('');
    SetFechaNacimiento('');
    setSexo('');
    navigation.goBack();


  }


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}> Registro de datos del cliente  </Text>

      <View style={styles.containerInput}>

        <Text style={styles.label}> Cedula </Text>
        <TextInput
          style={styles.input}
          value={cedula}
          onChangeText={setCedula}
          placeholder='Ej: 365-440955-0002h'
        />

        <Text style={styles.label}>Nombres: </Text>
        <TextInput
          style={styles.input}
          value={nombres}
          onChangeText={setNombres}
          placeholder='Ej: Juan carlos '>
        </TextInput>

        <Text style={styles.label}>Apellidos</Text>
        <TextInput
          style={styles.input}
          value={apellidos}
          onChangeText={setApellidos}
          placeholder='Apellidos'
        ></TextInput>

        <Text style={styles.label}>Fecha de nacimiento</Text>
        <TextInput
          style={styles.input}
          value={fechaNacimiento}
          onChangeText={SetFechaNacimiento}
          placeholder='YYYY-MM-DD'
        ></TextInput>


        <Text style={styles.label}>Sexo</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={sexo}
            onValueChange={(itemValue) => setSexo(itemValue)}
          >
            <Picker.Item label="Seleccione.." value="" />
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Femenino" value="Femenino" />
          </Picker>
        </View>

      </View>

      <View style={styles.botonGuardar}>
        <TouchableOpacity style={styles.boton}
          onPress={guardar}>
          <Text style={styles.texto}  >Guardar</Text>
        </TouchableOpacity>
      </View>

    </View>


  )

}

export default Formulario;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#E6F7E6'

  },
  containerInput: {

  },

  label: {
    fontWeight: 'bold',
    marginTop: 10,
    width: 300,
  },
  input: {
    borderWidth: 1,
    borderColor: '#358B47',
    padding: 8,
    marginTop: 5,
    borderRadius: 5,
    width: 300,
    height: 55
  },
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#999',
    marginTop: 5,
    marginBottom: 15,
    width: 300,
    borderColor: '#358B47',
  },
  titulo: {
    fontSize: 25,
    paddingBottom: 10,
    fontWeight: 'bold',
    color: '#4F8B2E',
    alignContent: 'center'
  },
  botonGuardar: {
    margin: 10,
  },
  boton: {
    backgroundColor: '#358B47',
    height: 50,
    width: 300,
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
  }
})
