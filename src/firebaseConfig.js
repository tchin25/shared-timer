import * as firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/auth";


// firebase init goes here
var config = {
  apiKey: "AIzaSyBkx3eTXAqsT48t37WnepmtNyXB5ddH36Y",
  authDomain: "shared-timer-911a5.firebaseapp.com",
  databaseURL: "https://shared-timer-911a5.firebaseio.com",
  projectId: "shared-timer-911a5",
  storageBucket: "shared-timer-911a5.appspot.com",
  messagingSenderId: "1048699862391",
  appId: "1:1048699862391:web:bd95247a14ca0b9715b572",
  measurementId: "G-4ZZYBNKLCG"
};


firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;
// const storageRef = firebase.storage().ref();

export {
    db,
    auth,
    currentUser,
    // storageRef
}