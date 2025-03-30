import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

// Configuração do Firebase (do projeto TESTE 2)
const firebaseConfig = {
  apiKey: "AIzaSyBp0XSAjtk33cxA8sG7GgSzpWoe6F0V7bg",
  authDomain: "teste-2-38fb0.firebaseapp.com",
  projectId: "teste-2-38fb0",
  storageBucket: "teste-2-38fb0.firebasestorage.app",
  messagingSenderId: "351240988669",
  appId: "1:351240988669:web:8831a49f5843c89b319b94"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Salva campanha no Firestore
export const salvarCampanha = async (dados) => {
  try {
    await addDoc(collection(db, "campanhas"), dados);
    console.log("✅ Campanha salva no Firestore");
  } catch (err) {
    console.error("❌ Erro ao salvar campanha:", err.message);
    throw err;
  }
};

// Lista campanhas do Firestore
export const listarResultados = async () => {
  try {
    const snapshot = await getDocs(collection(db, "campanhas"));
    return snapshot.docs.map((doc) => doc.data());
  } catch (err) {
    console.error("❌ Erro ao listar campanhas:", err.message);
    return [];
  }
};
