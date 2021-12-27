import express from "express";
import * as http from "http";
import bodyParser from "body-parser";

import { Routes } from "./routes";
import { Logger } from "./logger";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3100;

app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
new Routes(app);

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(`Server is running at localhost:${port}`);
  Logger.info(`Server is running at localhost:${port}`);
});
server.listen(port, () => {
  console.log(`Server is listening at localhost:${port}`);
  Logger.info(`Server is running at localhost:${port}`);
});

export default app;
