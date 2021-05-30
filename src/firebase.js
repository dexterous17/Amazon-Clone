import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAeAaGdYCECxjEh64dZglez8NGttXRppzw",
    authDomain: "clone-7ef08.firebaseapp.com",
    databaseURL: "https://clone-7ef08.firebaseio.com",
    projectId: "clone-7ef08",
    storageBucket: "clone-7ef08.appspot.com",
    messagingSenderId: "849866372193",
    appId: "1:849866372193:web:452cdea6b4fa65c436a620",
    measurementId: "G-RJB9P3JKFD"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);


const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db,auth};