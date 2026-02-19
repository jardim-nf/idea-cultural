// src/services/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4-qJzX-gm728nMPs0MaIpvqADwVTHM6w",
  authDomain: "ideia-cultural.firebaseapp.com",
  projectId: "ideia-cultural",
  storageBucket: "ideia-cultural.firebasestorage.app",
  messagingSenderId: "1022231442869",
  appId: "1:1022231442869:web:4fe970241f7166588155fc",
  measurementId: "G-GV98X9MBTD"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços prontos para uso
export const auth = getAuth(app);
export const db = getFirestore(app);