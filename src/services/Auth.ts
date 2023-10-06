import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_UserType, LoginUserType, ComparePasswordType, CreateUserType, ResetPasswordUserType } from "./@types/Auth";
import prisma from "../db";
import { User } from "@prisma/client";
import { ServicesExportType } from "../../@types";

// create a JWT token
export const createJWT = (user: JWT_UserType) => {
  const token = jwt.sign(user, process.env.JWT_SECRET as string);
  return token;
};

export const comparePassword = ({ password, hash }: ComparePasswordType) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const createUser = async (userData: CreateUserType): ServicesExportType<User> => {
  try {
    const { email, password, firstname, lastname, dob, username, image,accountType } = userData;

    const newUsername = username?.substring(0, 11) || firstname.substring(0, 11);

    const newPassword: string = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        password: newPassword,
        email,
        firstname,
        lastname,
        dob,
        ...(accountType ? { accountType } : {}),
        username: newUsername,
        image,
      },
    });
    return {
      data: newUser,
      error: null,
      message: "",
      statusCode: 200,
    };
  } catch (error: any) {
    console.log(error.message);
    if (error.message.includes("User_email_key"))
      return {
        data: null,
        error: "Email is already taken",
        message: "",
        statusCode: 403,
      };

    return {
      data: null,
      error: error.message,
      message: "",
      statusCode: 500,
    };
  }
};

export const loginUser = async ({ email, password }: LoginUserType): ServicesExportType<{ token: string }> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        password: true,
        accountType: true,
        id: true,
        username: true,
      },
    });
    //if the user is not found
    if (!user)
      return {
        data: null,
        message: "",
        statusCode: 404,
        error: "User not found",
      };

    //else compare passwords
    const doesPasswordMatch = await comparePassword({ password, hash: user.password });

    if (doesPasswordMatch) {
      //create a token
      const token = createJWT({
        id: user.id,
        accountType: user.accountType,
        username: user.username,
      });
      console.log(token);

      return {
        data: { token },
        message: "",
        statusCode: 200,
        error: null,
      };
    }
    return {
      data: null,
      message: "",
      statusCode: 403,
      error: `Password doesn't match`,
    };
  } catch (error: any) {
    return {
      data: null,
      message: "",
      statusCode: 404,
      error: error.message,
    };
  }
};

export const resetPassword = async ({ id, oldPassword, newPassword }: ResetPasswordUserType): ServicesExportType<null> => {
  try {
    //if old password is the same as new password
    if (oldPassword === newPassword)
      return {
        data: null,
        message: "",
        statusCode: 403,
        error: "New password cannot be the same as old password",
      };

    //else

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        password: true,
      },
    });
    //if the user is not found
    if (!user)
      return {
        data: null,
        message: "",
        statusCode: 404,
        error: "User not found",
      };

    //else compare passwords
    const doesPasswordMatch = await comparePassword({ password: oldPassword, hash: user.password });

    if (doesPasswordMatch) {
      const newlyHashedPassword = await hashPassword(newPassword);
      //reset password
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          password: newlyHashedPassword,
        },
      });
      return {
        data: null,
        message: "Password reset successful",
        statusCode: 200,
        error: null,
      };
    }
    return {
      data: null,
      message: "",
      statusCode: 403,
      error: `Incorrect old Password`,
    };
  } catch (error: any) {
    console.log(error);
    return {
      data: null,
      message: "",
      statusCode: 404,
      error: error.message,
    };
  }
};

