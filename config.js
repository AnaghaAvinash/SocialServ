import firebase from 'firebase';
require('@firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyCV4vM5rDbq5VllRU_5d2ox9PIcp330SwY",
  authDomain: "wireless-buzzer-744bc.firebaseapp.com",
  databaseURL: "https://wireless-buzzer-744bc-default-rtdb.firebaseio.com",
  projectId: "wireless-buzzer-744bc",
  storageBucket: "wireless-buzzer-744bc.appspot.com",
  messagingSenderId: "557950123571",
  appId: "1:557950123571:web:f4b18ae67623ea04da2d46",
  measurementId: "G-BBE98BFM0W"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
