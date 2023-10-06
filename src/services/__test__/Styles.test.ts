import { describe, expect, test, afterAll, beforeAll } from "@jest/globals";
import * as Styles from "../Style";
import * as Category from "../Category";
import prisma from "../../db";

beforeAll(async () => {
  await prisma.category.deleteMany({ where: { name: "styletest" } });
  const testdata = {
    name: "styletest",
    coverImage: "styletest",
  };
  const { data, statusCode, message, error } = await Category.createCategory(testdata);
  expect(data).toHaveProperty("id");
  expect(statusCode).toBe(200);
});

let styleId = "";

describe("style service", () => {
  test("should create a new styles", async () => {
    const testdata = (num: number) => ({
      name: `styletest${num}`,
      description: `styletest${num}`,
      coverPicture: `styletest${num}`,
      stylePictures: [`styletest${num}`],
      averageTime: 3,
      categoryName: `styletest`,
      note: `styletest${num}`,
    });
    const promises = await Promise.all([
      (Styles.createStyle(testdata(1)), Styles.createStyle(testdata(2)), Styles.createStyle(testdata(3))),
    ]);
    const { data, statusCode } = promises[0];
    styleId = data?.id || "";
    expect(data).toHaveProperty("id");
    expect(statusCode).toBe(200);
  });
  test("should not create a duplicate style", async () => {
    const testdata = {
      name: "styletest3",
      description: "test",
      coverPicture: "test",
      stylePictures: ["test"],
      averageTime: 3,
      categoryName: "styletest",
      note: "test",
    };
    const { statusCode, error, data, message } = await Styles.createStyle(testdata);
    expect(error).toBe("Style name already exists");
    expect(statusCode).toBe(400);
  });
  test("should edit a style", async () => {
    const testdata = {
      id: styleId,
      name: "styletest4",
    };
    const { data, statusCode } = await Styles.editOneStyle(testdata);
    expect(data?.name).toBe("styletest4");
    expect(statusCode).toBe(200);
  });
  test("should not update onto category that doesn't exist", async () => {
    const testdata = {
      id: styleId,
      categoryName: "styletest5",
    };
    const { error, statusCode } = await Styles.editOneStyle(testdata);
    expect(error).toBe("category does not exist");
    expect(statusCode).toBe(404);
  });
  test("should get one style", async () => {
    const testdata = "styletest4";

    const { data, statusCode } = await Styles.getOneStyle(testdata);
    expect(data?.name).toBe("styletest4");
    expect(statusCode).toBe(200);
  });
  test("should get multiple styles", async () => {
    const { data, statusCode } = await Styles.getAllStyles(1);

    const testStyles = data?.filter((ele) => ele.name.includes("styletest"));
    expect(testStyles?.length).toBeGreaterThan(2);
    expect(statusCode).toBe(200);
  });
  test("should search for styles", async () => {});

  test("should delete one style", async () => {
    const testdata = styleId;
    const { message, statusCode } = await Styles.deleteOneStyle(testdata);
    expect(message).toBe("Style delete successfully");
    expect(statusCode).toBe(200);
  });
  test("should delete multiple styles", async () => {
    const idLists = await prisma.style.findMany({
      where: { name: { contains: "styletest" } },
      select: { id: true },
    });
    const styleIds = idLists.map((ele) => ele.id);

    const testdata = styleIds;
    const { message, statusCode } = await Styles.deleteMultipleStyles(testdata);
    expect(message).toBe("Styles delete successfully");
    expect(statusCode).toBe(200);
  });
});
