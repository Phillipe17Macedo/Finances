import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBgqGSo-2P2gSx5wIUzPeMgxWekXxrNh-k",
  authDomain: "finances-33298.firebaseapp.com",
  databaseURL: "https://finances-33298-default-rtdb.firebaseio.com",
  projectId: "finances-33298",
  storageBucket: "finances-33298.appspot.com",
  messagingSenderId: "76100061458",
  appId: "1:76100061458:web:0e3186047b159e42894bcb",
  measurementId: "G-XDCYF4Z0JF"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
