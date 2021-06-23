import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAu8R2dliBO2nQ3pc5MvX0to1k8t2n7gtQ',
  authDomain: 'react-practices-b915b.firebaseapp.com',
  databaseURL: 'https://react-practices-b915b-default-rtdb.firebaseio.com',
  projectId: 'react-practices-b915b',
  storageBucket: 'react-practices-b915b.appspot.com',
  messagingSenderId: '350501490135',
  appId: '1:350501490135:web:c830a5bc1321bd4b22cf92',
  measurementId: 'G-L53B3RPBQG'
 };

const firebaseConfigTesting = {
  apiKey: 'AIzaSyB7C5OmgXO9-e5vLozqJuMhPJNaZsTnGSo',
  authDomain: 'testing-databases-447ef.firebaseapp.com',
  projectId: 'testing-databases-447ef',
  storageBucket: 'testing-databases-447ef.appspot.com',
  messagingSenderId: '462826107758',
  appId: '1:462826107758:web:37ac34bd90b2898548c77f'
};

if( process.env.NODE_ENV === 'test' ) {
  // testing
  firebase.initializeApp(firebaseConfigTesting);
} else {
  firebase.initializeApp(firebaseConfig);
}


// Initialize Firebase

const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { db, googleAuthProvider, firebase}