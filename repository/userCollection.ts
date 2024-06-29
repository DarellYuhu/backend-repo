import { adminApp, converter } from "../config/firebaseConfig";
import { firestore } from "firebase-admin";

const userCollections = firestore(adminApp)
  .collection("users")
  .withConverter(converter<User>());

export default userCollections;
