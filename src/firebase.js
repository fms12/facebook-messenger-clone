import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBRseHecKGAijXt3x_cpC5efRplPTsZZ3g",
    authDomain: "facebook-messenger-clone-c66fb.firebaseapp.com",
    projectId: "facebook-messenger-clone-c66fb",
    storageBucket: "facebook-messenger-clone-c66fb.appspot.com",
    messagingSenderId: "658756714688",
    appId: "1:658756714688:web:68a11db43b4fb2e8cbed25",
    measurementId: "G-BFSX3Q5E7Z"

});
const db = firebaseApp.firestore();
export default db;