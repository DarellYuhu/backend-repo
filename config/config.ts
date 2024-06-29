import dotenv from "dotenv";
dotenv.config();

export class Config {
  public static PORT = process.env.PORT || 3000;
  public static FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
  public static SERVICE_CRED_PATH = process.env.SERVICE_CRED_PATH || "";
}
