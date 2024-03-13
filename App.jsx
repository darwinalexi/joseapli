import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Agregar esta línea
import FormRegistro from './src/components/registro.jsx';
import MostrarCategoria from './src/components/categoria.jsx';
import { createTable } from './services/Databases.jsx';
import FormActualizarCategoria from './src/components/actualizar.jsx';


const Tab = createBottomTabNavigator();

const App = () => {
  useEffect(() => {
    createTable();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: '#ddd',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Form') {
              iconName = focused ? '' : '';
            } else if (route.name === 'Mostrar') {
              iconName = focused ? '' : '';
            } else if (route.name === 'Mostrar') {
              iconName = focused ? '' : '';
            }
            return <Text style={{ fontSize: size, color: color }}>{iconName}</Text>;
          },
          tabBarStyle: {
            backgroundColor: '#fff',
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Ingresa Categoria" component={FormRegistro} />
        <Tab.Screen name="Actualizar Categoria" component={FormActualizarCategoria} />
        <Tab.Screen name="Mostrar" component={MostrarCategoria} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
