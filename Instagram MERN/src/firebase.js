import firebase from "firebase";

// oldd
// const firebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyBucH7Kzm8Ds5CbuUs8uQJlzTPh3eZcTzA",
//   authDomain: "instagram-clone-23884.firebaseapp.com",
//   databaseURL: "https://instagram-clone-23884.firebaseio.com",
//   projectId: "instagram-clone-23884",
//   storageBucket: "instagram-clone-23884.appspot.com",
//   messagingSenderId: "671034896143",
//   appId: "1:671034896143:web:3aceafdf2319c9f1fc587a",
// });

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDa2LsIpHh6lYiqZCJoQJvc78WAflauAyc",
  authDomain: "instagram-mern-cfb7d.firebaseapp.com",
  databaseURL: "https://instagram-mern-cfb7d-default-rtdb.firebaseio.com",
  projectId: "instagram-mern-cfb7d",
  storageBucket: "instagram-mern-cfb7d.appspot.com",
  messagingSenderId: "1042253526625",
  appId: "1:1042253526625:web:52571ba122bbcc868ddc20"
});



const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
