import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { getCategorias } from '../../services/Databases';

const MostrarCategoria = () => {
 const [categorias, setCategorias] = useState([]);
 const [reload, setReload] = useState(false); // Estado para trigger de recarga

 useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categoriasData = await getCategorias();
        setCategorias(categoriasData);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategorias();
 }, [reload]); // Dependencia del estado reload

 const renderCategorias = ({ item }) => (
    <View style={{
      flexDirection: "row",
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderColor: "#ddd",
    }}>
      <Text style={{ marginRight: 9 }}>{item.id}</Text>
      <Text>{item.name}</Text>
    </View>
 );

 // Función para forzar la recarga de los datos
 const recargarDatos = () => {
    setReload(!reload); // recarga los datos
 };

 return (
    <View>
      <FlatList
        data={categorias}
        renderItem={renderCategorias}
        keyExtractor={item => item.id.toString()}
      />
      
      <Button title="Recargar Datos" onPress={recargarDatos} />
    </View>
 );
};

export default MostrarCategoria;

