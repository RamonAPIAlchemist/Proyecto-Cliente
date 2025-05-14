import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

function ClientForm({ route, navigation }) {
  const { guardarNuevo } = route.params;
  const [idNumber, setIdNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = () => {
    if (!idNumber || !firstName) return;
    
    const newClient = {
      Ncedula: idNumber,
      Nnombres: firstName,
      Napellidos: lastName,
      Nfechanac: birthDate,
      Nsexo: gender,
    };

    guardarNuevo(newClient);
    Alert.alert(
      'Registro exitoso',
      `Datos del cliente:\n
      Cédula: ${idNumber}\n
      Nombres: ${firstName}\n
      Apellidos: ${lastName}\n
      Fecha Nacimiento: ${birthDate}\n
      Sexo: ${gender}`
    );

    // Reset form
    setIdNumber('');
    setFirstName('');
    setLastName('');
    setBirthDate('');
    setGender('');
    navigation.goBack();
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Datos del Cliente</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Cédula</Text>
        <TextInput
          style={styles.textInput}
          value={idNumber}
          onChangeText={setIdNumber}
          placeholder="Ej: 001-1234567-8"
          keyboardType="numeric"
        />

        <Text style={styles.inputLabel}>Nombres</Text>
        <TextInput
          style={styles.textInput}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Ej: María José"
        />

        <Text style={styles.inputLabel}>Apellidos</Text>
        <TextInput
          style={styles.textInput}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Ej: Rodríguez Pérez"
        />

        <Text style={styles.inputLabel}>Fecha de Nacimiento</Text>
        <TextInput
          style={styles.textInput}
          value={birthDate}
          onChangeText={setBirthDate}
          placeholder="AAAA-MM-DD"
        />

        <Text style={styles.inputLabel}>Género</Text>
        <View style={styles.genderPicker}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Seleccione..." value="" />
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Femenino" value="Femenino" />
          </Picker>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Guardar Datos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ClientForm;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6F7E6',
    padding: 20
  },
  inputGroup: {
    width: '100%',
    maxWidth: 300
  },
  inputLabel: {
    fontWeight: '600',
    marginTop: 12,
    color: '#333'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#4F8B2E',
    padding: 12,
    marginTop: 6,
    borderRadius: 6,
    height: 50,
    backgroundColor: '#FFF'
  },
  genderPicker: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#4F8B2E',
    marginTop: 6,
    marginBottom: 20,
    backgroundColor: '#FFF'
  },
  formTitle: {
    fontSize: 24,
    paddingBottom: 15,
    fontWeight: '700',
    color: '#4F8B2E',
    textAlign: 'center',
    marginBottom: 10
  },
  buttonContainer: {
    marginVertical: 15,
    width: '100%',
    alignItems: 'center'
  },
  submitButton: {
    backgroundColor: '#358B47',
    height: 50,
    width: 300,
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
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 18
  }
});