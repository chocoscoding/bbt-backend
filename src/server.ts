import express, { ErrorRequestHandler, Request } from "express";
import morgan from "morgan";
import cors from "cors";
import { Auth, Category } from "./routes";
import { errorHandler } from "./middleware/ErrorHandler";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", Auth);
app.use("/api/category", Category);

app.use(errorHandler);

export default app;
