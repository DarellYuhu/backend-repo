import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import { initializeApp } from "firebase/app";
import { Config } from "./config";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: "interview-test-c9331.firebaseapp.com",
  projectId: "interview-test-c9331",
  storageBucket: "interview-test-c9331.appspot.com",
  messagingSenderId: "190746525738",
  appId: "1:190746525738:web:07da9650e0bb281411c353",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const adminApp = admin.initializeApp({
  credential: cert(Config.SERVICE_CRED_PATH),
});

const auth = getAuth();
const firestore = getFirestore();
const functions = getFunctions();

// using emulator for localhost
process.env.FIREBASE_AUTH_EMULATOR_HOST;
connectAuthEmulator(auth, "http://127.0.0.1:9099");
connectFirestoreEmulator(firestore, "http://127.0.0.1", 8080);
connectFunctionsEmulator(functions, "127.0.0.1", 5001);

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

export { auth, adminApp, converter };
