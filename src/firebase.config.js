import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbukDFk1YThoPHfDyjpa5d6fdybhdMfDo",
  authDomain: "food-order-app-8e74d.firebaseapp.com",
  databaseURL: "https://food-order-app-8e74d-default-rtdb.firebaseio.com",
  projectId: "food-order-app-8e74d",
  storageBucket: "food-order-app-8e74d.appspot.com",
  messagingSenderId: "9593962559",
  appId: "1:9593962559:web:9ced214885738b667f388a",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
