import { Config } from "./config/config";
import app from "./core/app";

app.listen(Config.PORT, () => {
  console.log(`[server] server is running at port: ${Config.PORT}`);
});
