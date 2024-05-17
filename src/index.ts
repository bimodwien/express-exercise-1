"use strict";

import express, { NextFunction, Request, Response, urlencoded } from "express";
import PORT from "./config";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to API");
});

app.use("/", router);

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof Error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`App listen on port: ${PORT}`);
});
