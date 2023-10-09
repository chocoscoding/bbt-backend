import { JWT_UserType } from "../../src/services/@types/Auth";

//extend the express Request interface
declare module "express-serve-static-core" {
  interface Request {
    user?: JWT_UserType;
  }
}

declare module "express" {
  interface ErrorRequestHandler {
    location?: string;
  }
}
