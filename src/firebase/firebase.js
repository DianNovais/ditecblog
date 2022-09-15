import {initializeApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCx7AI3hS4eGSshfhhUW2BO6H6K3gZQFRI",
  authDomain: "miniblog-2302f.firebaseapp.com",
  projectId: "miniblog-2302f",
  storageBucket: "miniblog-2302f.appspot.com",
  messagingSenderId: "311322583480",
  appId: "1:311322583480:web:c79dcba6a30c15a89a6f4d"
};


  const app = () => initializeApp(firebaseConfig);
  const start = initializeApp(firebaseConfig);
  const db = getFirestore(start);

  export { app, db}