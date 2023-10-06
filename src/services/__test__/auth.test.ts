import { describe, expect, afterAll, test } from "@jest/globals";
import * as auth from "../Auth";
import { deleteAccountForTest } from "./helper";

let userid = "";
let managerid = "";
describe("auth controller", () => {
  test("should create a new user", async () => {
    const testdata = {
      email: "test@gmail.com",
      password: "123456789",
      firstname: "test",
      lastname: "test",
      dob: "01-01-01",
      username: "testuser",
      image: "testimage",
    };

    const { data, statusCode, message, error } = await auth.createUser(testdata);
    userid = data?.id || "";
    expect(data).toHaveProperty("id");
    expect(statusCode).toBe(200);
    expect(message).toBe("");
    expect(error).toBe(null);
  });

  test("should create a new manager", async () => {
    const testdata = {
      email: "test@gmail.com",
      password: "123456789",
      firstname: "test",
      lastname: "test",
      dob: "01-01-01",
      username: "testuser",
      image: "testimage",
      accountType: "ADMIN" as const,
    };

    const { data, statusCode, message, error } = await auth.createManager(testdata);
    managerid = data?.id || "";
    expect(data).toHaveProperty("id");
    expect(statusCode).toBe(200);
    expect(message).toBe("");
    expect(error).toBe(null);
  });
  test("should login user", async () => {
    const testdata = {
      email: "test@gmail.com",
      password: "123456789",
    };

    const { data, statusCode, message, error } = await auth.loginUser(testdata);

    expect(data).toHaveProperty("token");
    expect(statusCode).toBe(200);
    expect(message).toBe("");
    expect(error).toBe(null);
  });
  test("should login manager", async () => {
    const testdata = {
      email: "test@gmail.com",
      password: "123456789",
    };

    const { data, statusCode, message, error } = await auth.loginManager(testdata);

    expect(data).toHaveProperty("token");
    expect(statusCode).toBe(200);
    expect(message).toBe("");
    expect(error).toBe(null);
  });
  test("should reset password of user", async () => {
    const testdata = {
      newPassword: "12345678910",
      oldPassword: "123456789",
      id: userid,
    };

    const { data, statusCode, message, error } = await auth.resetPasswordUser(testdata);

    expect(statusCode).toBe(200);
    expect(message).toBe("Password reset successful");
    expect(error).toBe(null);
  });
  test("should reset password of manager", async () => {
    const testdata = {
      newPassword: "12345678910",
      oldPassword: "123456789",
      id: managerid,
    };
    console.log(managerid);

    const { data, statusCode, message, error } = await auth.resetPasswordManager(testdata);

    expect(statusCode).toBe(200);
    expect(message).toBe("Password reset successful");
    expect(error).toBe(null);
  });
  afterAll(async () => {
    await deleteAccountForTest({ email: "test@gmail.com", accountType: "user" });
    await deleteAccountForTest({ email: "test@gmail.com", accountType: "manager" });
  });
});
