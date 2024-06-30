import { onRequest } from "firebase-functions/v1/https";
import app from "./core/app";

// app.listen(Config.PORT, () => {
//   console.log(`[server] server is running at port: ${Config.PORT}`);
// });

onRequest(app);
