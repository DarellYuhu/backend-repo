import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import { initializeApp } from "firebase/app";
import { Config } from "./config";

const firebaseConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: "interview-test-c9331.firebaseapp.com",
  projectId: "interview-test-c9331",
  storageBucket: "interview-test-c9331.appspot.com",
  messagingSenderId: "190746525738",
  appId: "1:190746525738:web:07da9650e0bb281411c353",
};

// Initialize Firebase
const webApp = initializeApp(firebaseConfig);
const adminApp = admin.initializeApp({
  credential: cert(Config.SERVICE_CRED_PATH),
});

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

export { webApp, adminApp, converter };
