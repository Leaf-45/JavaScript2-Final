const firebaseConfig = {
    apiKey: "AIzaSyAZxpmLCM3ZdcUJeZ8NsBvHJerPLI0Nei8",
    authDomain: "javascript-2-a794e.firebaseapp.com",
    projectId: "javascript-2-a794e",
    storageBucket: "javascript-2-a794e.appspot.com",
    messagingSenderId: "904766496118",
    appId: "1:904766496118:web:98084b30a00ce2a9f96e57",
    measurementId: "G-CYBC77FGNR"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage().ref();

