import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
interface Usuario {
    nome: string;
    telefone: string;
    email: string;
    senha: string;
    usuario: string;
  }
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

export const salvarUsuario = (usuario: Usuario) => {
  push(ref(db, 'usuarios'), usuario)
    .then((newUserRef) => {
      console.log("Novo usuário adicionado com ID: ", newUserRef.key);
    })
    .catch((error) => {
      console.error("Erro ao adicionar novo usuário: ", error);
    });
};
