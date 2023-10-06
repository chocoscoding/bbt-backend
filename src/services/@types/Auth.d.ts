import { AccountType, Manager } from "@prisma/client";

interface JWT_UserType {
  id: string;
  accountType: AccountType;
  username: string;
}

interface ComparePasswordType {
  password: string;
  hash: string;
}

interface HashPasswordType {
  password: string;
}

interface CreateUserType {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  dob: string;
  accountType?: "USER" | "ADMIN";
  username: string;
  image: string;
}
interface CreateManagerType extends Omit<CreateUserType, "accountType"> {
  accountType: "OWNER" | "ADMIN";
}
interface LoginUserType {
  email: string;
  password: string;
}
interface ResetPasswordUserType {
  id?: string;
  oldPassword: string;
  newPassword: string;
}
