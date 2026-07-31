const firebaseConfig = {
  apiKey: "AIzaSyDoebRH73zCeMEJj8WQnF_RxA009M6ZiQc",
  authDomain: "playscore-49b89.firebaseapp.com",
  projectId: "playscore-49b89",
  storageBucket: "playscore-49b89.firebasestorage.app",
  messagingSenderId: "392041500501",
  appId: "1:392041500501:web:b0511a744995adb308e9dc",
  measurementId: "G-F745YKEMJ6"
};


firebase.initializeApp(firebaseConfig);

// Atalhos globais para usar no restante do projeto
const auth = firebase.auth();
const db = firebase.firestore();