import { initializeApp } from 'firebase/app';
import { getDatabase, update, ref, set, get, push, DataSnapshot } from 'firebase/database';

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
  const usuariosRef = ref(db, 'usuarios');

  push(usuariosRef)
    .then((newUserRef) => {
      // Obtém o ID único gerado para o novo usuário
      const usuarioId = newUserRef.key;

      // Adiciona o ID único aos dados do usuário
      const usuarioComId = { ...usuario, id: usuarioId };

      // Salva o usuário com o ID no banco de dados
      set(ref(db, `usuarios/${usuarioId}`), usuarioComId)
        .then(() => {
          console.log("Novo usuário adicionado com ID: ", usuarioId);
        })
        .catch((error) => {
          console.error("Erro ao adicionar novo usuário: ", error);
        });
    })
    .catch((error) => {
      console.error("Erro ao gerar ID para novo usuário: ", error);
    });
};
// Função para atualizar os dados de um usuário no banco de dados
export const atualizarDadosNoBanco = async (usuarioId, novosDados) => {
  try {
    await update(ref(db, `usuarios/${usuarioId}`), novosDados);
    console.log("Dados do usuário atualizados com sucesso.");
  } catch (error) {
    console.error("Erro ao atualizar dados do usuário:", error);
    throw error;
  }
};

export const buscarDadosDoBanco = async () => {
  try {
    const snapshot: DataSnapshot = await get(ref(db, 'usuarios'));
    const dados: Usuario[] = [];
    snapshot.forEach((childSnapshot) => {
      // Extrai os dados de cada usuário do snapshot
      const usuario: Usuario = childSnapshot.val();
      dados.push(usuario);
    });
    return dados;
  } catch (error) {
    console.error("Erro ao buscar dados no banco:", error);
    throw error;
  }
};