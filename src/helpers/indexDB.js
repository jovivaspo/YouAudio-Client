import { openDB } from "idb";
const database = {
  dbName: "YouAudioDB",
  dbVersion: 1,
  storeName: "myAudioStore",
};

const openDataBase = async () => {
  try {
    const db = await openDB(database.dbName, database.dbVersion, {
      upgrade(db) {
        db.createObjectStore(database.storeName);
      },
    });
    return db;
  } catch (error) {
    console.log(error);
    return { error: "Error al abrir la base de datos" };
  }
};

export const getFile = async (id) => {
  try {
    const db = await openDataBase();
    const file = await db.get(database.storeName, id);
    return file;
  } catch (error) {
    console.log(error);
    return { error: "Error al tomar el archivo" };
  }
};

export const updateDataBase = async (file, id) => {
  try {
    const db = await openDataBase();
    await db.put(database.storeName, file, id);
  } catch (error) {
    console.log(error);
    return { error: "Error al tomar el archivo" };
  }
};

export const deleteFile = async (id) => {
  try {
    const db = await openDataBase();
    await db.delete(database.storeName, id);
  } catch (error) {
    console.log(error);
    return { error: "Error al tomar el archivo" };
  }
};

export const getAllFiles = async () => {
  try {
    const db = await openDataBase();

    const keys = await db.getAllKeys(database.storeName);

    return keys;
  } catch (error) {
    console.log(error);
    return { error: "Error al obtener todos los elementos" };
  }
};
