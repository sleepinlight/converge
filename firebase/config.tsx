import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBXfzUBio9NiucWsV6VTli1L4i8eRjSzW4",
    authDomain: "mindreader-ec661.firebaseapp.com",
    databaseURL: "https://mindreader-ec661.firebaseio.com",
    projectId: "mindreader-ec661",
    storageBucket: "mindreader-ec661.appspot.com",
    messagingSenderId: "1077624981050",
    appId: "1:1077624981050:web:06146ca7692e02fb8e9703",
    measurementId: "G-WM018HBJ0V"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };