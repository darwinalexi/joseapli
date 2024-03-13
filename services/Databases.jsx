// Databases.jsx
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'rn_sqlite' });

export const createTable = async () => {
  try {
    await db.executeSql(
      `CREATE TABLE IF NOT EXISTS categoria (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20))`,
      []
    );
    console.log('Tabla creada correctamente');
  } catch (error) {
    console.log('Error al crear la tabla: ' + error.message);
  }
};

export const getCategorias = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM categoria ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          let len = res.rows.length;
          let resultado = [];
          for (let i = 0; i < len; i++) {
            let item = res.rows.item(i);
            resultado.push({ id: item.id, name: item.name });
          }
          resolve(resultado);
        },
        error => {
          console.log('Error al obtener las categorías: ' + error.message);
          reject(error);
        }
      );
    });
  });
};

export const addcategoria = async (categoria) => {
  if (!categoria) {
    console.log('Ingrese una categoría correcta');
    return false;
  }

  try {
    await db.executeSql(
      `INSERT INTO categoria (name) VALUES (?)`,
      [categoria]
    );
    console.log(`${categoria} Categoria ingresada`);
    return true;
  } catch (error) {
    console.log('Error al ingresar la categoría: ' + error.message);
    return false;
  }
};

export const updateCategoria = async (categoria) => {
  // Verificar si el objeto categoria y sus propiedades id y name están definidos
  if (!categoria || !categoria.id || !categoria.name) {
     console.log('Por favor ingrese la ingformacion correspondiente.');
     return false;
  }
 
  const { id, name } = categoria; // Desestructuración del objeto categoria
 
  try {
     await db.transaction(tx => {
       tx.executeSql(
         `UPDATE categoria SET name = ? WHERE id = ?`,
         [name, id],
         (tx, results) => {
           console.log(`Categoría con ID ${id} actualizada correctamente.`);
         },
         (error) => {
           console.log('Error al actualizar la categoría: ' + error.message);
         }
       );
     });
     return true;
  } catch (error) {
     console.log('Error al intentar actualizar la categoría: ' + error.message);
     return false;
  }
 };
 

