import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { addcategoria } from '../../services/Databases';

const FormRegistro = ({ actualizarCategorias }) => {
 const [categoria, setCategoria] = useState('');

 const handleSubmit = async () => {
    if (!categoria) {
      Alert.alert('Error', 'Por favor, ingrese una categoría.');
      return;
    }

    const success = await addcategoria(categoria);
    if (success) {
      Alert.alert('Éxito', 'Categoría agregada correctamente.');
      actualizarCategorias();
      setCategoria(''); 
    } else {
      Alert.alert('Error', 'Hubo un problema al agregar la categoría.');
    }
 };

 return (
    <View>
      <TextInput
        placeholder='Ingrese la categoría'
        value={categoria}
        onChangeText={setCategoria}
        style={{ marginHorizontal: 8 }}
      />
      <Button title='Enviar' onPress={handleSubmit} />
    </View>
 );
};

export default FormRegistro;
