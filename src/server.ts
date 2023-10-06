import express, { ErrorRequestHandler, Request } from "express";
import morgan from "morgan";
import cors from "cors";
import * as General from "./routes/general";
import * as Manager from "./routes/manager";
import * as Owner from "./routes/owner";
import * as User from "./routes/user";
import { errorHandler } from "./middleware/ErrorHandler";
import { isManager, isOwner, protectedRoute } from "./middleware/ProtectedRoute";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//for all
app.use("/api/auth", General.Auth);
app.use("/api/category", General.Category);
app.use("/api/style", General.Styles);

//for users
app.use("/api/user/", protectedRoute, User.User);

//for managers
app.use("/api/management/", protectedRoute, isManager, Manager.Manager);

//for owner
app.use("/api/owner/", protectedRoute, isOwner, Owner.Manager);

app.use(errorHandler);

export default app;
