import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { updateCategoria } from '../../services/Databases'; // Asegúrate de importar la función correctamente

const FormActualizarCategoria = ({navigation}) => {
 const [id, setId] = useState('');
 const [newName, setNewName] = useState('');

 const handleSubmit = async () => {
    if (!id || !newName) {
      Alert.alert('Error', 'Por favor, ingrese un ID y un nuevo nombre.');
      return;
    }

    const categoriaParaActualizar = {
      id: parseInt(id), // Convertir el ID a un número
      name: newName
    };

    const success = await updateCategoria(categoriaParaActualizar);
    if (success) {
      Alert.alert('Éxito', 'Categoría actualizada correctamente.');
    } else {
      Alert.alert('Error', 'Hubo un problema al actualizar la categoría.');
    }
 };

 return (
    <View>
      <TextInput
        placeholder='Ingrese el ID de la categoría'
        value={id}
        onChangeText={setId}
        keyboardType='numeric'
        style={{ marginHorizontal: 8 }}
      />
      <TextInput
        placeholder='Ingrese el nuevo nombre de la categoría'
        value={newName}
        onChangeText={setNewName}
        style={{ marginHorizontal: 8 }}
      />
      <Button title='Actualizar' onPress={handleSubmit} />
    </View>
 );
};

export default FormActualizarCategoria;
