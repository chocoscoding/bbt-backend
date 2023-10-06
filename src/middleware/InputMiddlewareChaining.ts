import { body, query, validationResult } from "express-validator";
import { handleInputError } from "./ErrorHandler";

export const signupMiddleware = [
  body("email").exists().isEmail(),
  body("password").exists().isLength({ min: 8 }),
  body("firstname").exists().isString(),
  body("lastname").exists().isString(),
  body("dob").exists().isString(),
  handleInputError,
];
export const managerSignupMiddleware = [
  body("creationPassword").exists().isString(),
  body("email").exists().isEmail(),
  body("password").exists().isLength({ min: 8 }),
  body("firstname").exists().isString(),
  body("lastname").exists().isString(),
  body("dob").exists().isString(),
  body("accountType").equals("ADMIN"),
  handleInputError,
];

export const loginMiddleware = [body("email").exists().isEmail(), body("password").exists().isLength({ min: 8 }), handleInputError];

export const resetPasswordMiddleware = [
  body("oldPassword").exists().isLength({ min: 8 }),
  body("newPassword").exists().isLength({ min: 8 }),
  handleInputError,
];
