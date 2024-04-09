import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBgqGSo-2P2gSx5wIUzPeMgxWekXxrNh-k",
  authDomain: "finances-33298.firebaseapp.com",
  projectId: "finances-33298",
  databaseURL: "https://finances-33298-default-rtdb.firebaseio.com",
  storageBucket: "finances-33298.appspot.com",
  messagingSenderId: "76100061458",
  appId: "1:76100061458:web:0e3186047b159e42894bcb",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
