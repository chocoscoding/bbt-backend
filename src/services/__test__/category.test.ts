import { describe, expect, afterAll, test } from "@jest/globals";
import * as Category from "../Category";
import prisma from "../../db";

let categoryId = "";
describe("category service", () => {
  test("should create a new category", async () => {
    const testdata = {
      name: "categorytest",
      coverImage: "categorytest",
    };
    const { data, statusCode, message, error } = await Category.createCategory(testdata);
    categoryId = data?.id || "";
    expect(data).toHaveProperty("id");
    expect(statusCode).toBe(200);
  });
  test("should not create a duplicate category", async () => {
    const testdata = {
      name: "categorytest",
      coverImage: "categorytest",
    };
    const { data, statusCode, message, error } = await Category.createCategory(testdata);
    expect(error).toBe("Category name already exists");
    expect(statusCode).toBe(400);
  });
  test("should get all category with at least one category", async () => {
    const { data, statusCode, message, error } = await Category.getCategories();
    expect(data?.length).toBeGreaterThan(0);
    const oneCategory = data?.find((ele) => ele.name === "categorytest");
    expect(oneCategory?.name).toBe("categorytest");
    expect(statusCode).toBe(200);
  });
  test("should edit one category", async () => {
    const category = await Category.getOneCategory({
      name: "categorytest",
    });
    const testdata = {
      id: category.data?.id || " ",
      data: {
        name: "categorytestnew",
        coverImage: "categorytestnew",
      },
    };
    const { data, statusCode, message, error } = await Category.editOneCategory(testdata);
    expect(data?.name).toBe("categorytestnew");
    expect(statusCode).toBe(200);
  });
  test("should get one category", async () => {
    const testdata = {
      name: "categorytestnew",
    };
    const { data, statusCode, message, error } = await Category.getOneCategory(testdata);
    expect(data?.name).toBe("categorytestnew");
    expect(statusCode).toBe(200);
  });
  test("should delete one category", async () => {
    const testdata = {
      id: categoryId,
    };
    const { data, statusCode, message, error } = await Category.deleteOneCategory(testdata);
    expect(message).toBe("Category delete successfully");
    expect(statusCode).toBe(200);
  });
});
afterAll(async () => {
  await prisma.category.deleteMany({
    where: {
      name: {
        contains: "categorytest",
      },
    },
  });
});
