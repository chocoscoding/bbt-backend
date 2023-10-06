import express from "express";
import morgan from "morgan";
import cors from "cors";
import { Auth } from "./routes";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", Auth);

export default app;
