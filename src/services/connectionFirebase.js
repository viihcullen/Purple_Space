
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/database';


const firebaseConfig = {
  apiKey: "AIzaSyB8EFkT-dGgnzH3GtIRiBmvy4RNVdp7Cuo",
  authDomain: "purplespace-4e915.firebaseapp.com",
  projectId: "purplespace-4e915",
  storageBucket: "purplespace-4e915.appspot.com",
  messagingSenderId: "639399953687",
  databaseURL: 'https://purplespace-4e915-default-rtdb.firebaseio.com/',
  appId: "1:639399953687:web:e930239f74cf15a9d0e352",
  measurementId: "G-1KSG297HXW"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;