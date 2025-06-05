import { Text, View, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

function Formulario({ route, navigation }) {
  const { guardarNuevo, clienteParaEditar, onGuardarEdicion } = route.params;

  const [cedula, setCedula] = useState(clienteParaEditar?.Ncedula || '');
  const [nombres, setNombres] = useState(clienteParaEditar?.Nnombres || '');
  const [apellidos, setApellidos] = useState(clienteParaEditar?.Napellidos || '');
  const [fechaNacimiento, setFechaNacimiento] = useState(clienteParaEditar?.Nfechanac || '');
  const [sexo, setSexo] = useState(clienteParaEditar?.Nsexo || '');

  const guardar = () => {
    if (!cedula || !nombres || !apellidos || !fechaNacimiento || !sexo) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    const cliente = {
      Ncedula: cedula,
      Nnombres: nombres,
      Napellidos: apellidos,
      Nfechanac: fechaNacimiento,
      Nsexo: sexo,
    };

    if (clienteParaEditar) {
      // Modo edición
      onGuardarEdicion(cliente);
    } else {
      // Modo creación
      guardarNuevo(cliente);
      Alert.alert('Datos almacenados', `
        Cédula: ${cedula}
        Nombres: ${nombres}
        Apellidos: ${apellidos}
        Fecha Nacimiento: ${fechaNacimiento}
        Sexo: ${sexo}
      `);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {clienteParaEditar ? "Editar cliente" : "Registro de datos del cliente"}
      </Text>

      <View style={styles.containerInput}>
        <Text style={styles.label}>Cédula</Text>
        <TextInput
          style={styles.input}
          value={cedula}
          onChangeText={setCedula}
          placeholder='Ej: 365-440955-0002h'
          editable={!clienteParaEditar}
        />

        <Text style={styles.label}>Nombres</Text>
        <TextInput
          style={styles.input}
          value={nombres}
          onChangeText={setNombres}
          placeholder='Ej: Alejandro Antonio'
        />

        <Text style={styles.label}>Apellidos</Text>
        <TextInput
          style={styles.input}
          value={apellidos}
          onChangeText={setApellidos}
          placeholder='Ej: Herrera Fernandez'
        />

        <Text style={styles.label}>Fecha de nacimiento</Text>
        <TextInput
          style={styles.input}
          value={fechaNacimiento}
          onChangeText={setFechaNacimiento}
          placeholder='YYYY-MM-DD'
        />

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
        <View style={styles.botonGuardar}>
          <TouchableOpacity style={styles.boton} onPress={guardar}>
            <Text style={styles.texto}>
              {clienteParaEditar ? "Actualizar" : "Guardar"}
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#E6F7E6'
  },
  containerInput: {
    marginBottom: 20
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    width: 300,
    fontSize: 16
  },
  input: {
    borderWidth: 1,
    borderColor: '#358B47',
    padding: 8,
    marginTop: 5,
    borderRadius: 5,
    width: 300,
    height: 55,
    fontSize: 16,
    backgroundColor: 'white'
  },
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#358B47',
    marginTop: 5,
    marginBottom: 15,
    width: 300,
    backgroundColor: 'white'
  },
  titulo: {
    fontSize: 25,
    paddingBottom: 20,
    fontWeight: 'bold',
    color: '#4F8B2E',
    textAlign: 'center',
    marginTop: 20
  },
  botonGuardar: {
    margin: 10,
    width: '100%',
    alignItems: 'center'
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
});

export default Formulario;