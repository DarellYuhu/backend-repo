import app from "../core/app";
import request from "supertest";
import userCollections from "../repository/userCollection";
import { adminApp, webApp } from "../config/firebaseConfig";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

let uid: string;
let token: string;
const auth = getAuth(webApp);

beforeAll(async () => {
  try {
    const user = await adminApp.auth().createUser({
      displayName: "Haruka",
      email: "haruka@mail.com",
      phoneNumber: "+6281234567890",
      password: "123456",
    });
    uid = user.uid;
    await userCollections.doc(user.uid).create({
      name: user.displayName || "anonymous",
      email: user.email,
      address: "Jakarta",
      phoneNumber: user.phoneNumber,
    });
    const cred = await signInWithEmailAndPassword(
      auth,
      "haruka@mail.com",
      "123456"
    );
    token = await cred.user.getIdToken();
  } catch (error) {
    console.log("ERR_TEST_SETUP", error);
    throw error;
  }
});

afterAll(async () => {
  try {
    await userCollections.doc(uid).delete();
    await adminApp.auth().deleteUser(uid);
  } catch (error) {
    console.log("ERR_TEST_CLEANUP", error);
    throw error;
  }
});

describe("Update user data", () => {
  it("should faill when token is not attached (401)", async () => {
    return request(app)
      .patch(`/user/update-user-data/${uid}`)
      .send({ address: "Cikarang" })
      .set("Content-Type", "application/json")
      .then((res) => {
        const data = res.body;
        expect(res.status).toBe(401);
        expect(data.message).toContain("not found");
      });
  });

  it("should faill when token is invalid (401)", async () => {
    return request(app)
      .patch(`/user/update-user-data/${uid}`)
      .auth("WORNG_TOKEN", { type: "bearer" })
      .send({ address: "Cikarang" })
      .set("Content-Type", "application/json")
      .then((res) => {
        const data = res.body;
        expect(res.status).toBe(401);
        expect(data.message).toContain("Invalid");
      });
  });

  it("should faill if the user not found (404)", async () => {
    return request(app)
      .patch("/user/update-user-data/user2")
      .auth(token, { type: "bearer" })
      .send({ address: "Cikarang" })
      .set("Content-Type", "application/json")
      .then((res) => {
        const data = res.body;
        expect(res.status).toBe(404);
        expect(data.message).toContain("not found");
      });
  });

  it("should success update user data (200)", async () => {
    return request(app)
      .patch(`/user/update-user-data/${uid}`)
      .auth(token, { type: "bearer" })
      .send({ address: "Cikarang" })
      .set("Content-Type", "application/json")
      .then((res) => {
        const data = res.body;
        expect(res.status).toBe(200);
        expect(data.message).toBe("data update successfully");
      });
  });
});
