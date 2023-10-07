import { Category } from "@prisma/client";
import { ServicesExportType } from "../../@types";
import prisma from "../db";
import { CategoriesType, CategoryInputType, CreateCategoryInputType, GetOneCategoryInputType } from "./@types/Category";

export const createCategory = async ({ name, coverImage }: CreateCategoryInputType): ServicesExportType<Category> => {
  try {
    const category = await prisma.category.create({
      data: {
        name,
        coverImage,
      },
    });
    return {
      data: category,
      error: "",
      message: "Category created successfully",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error: "",
      message: "",
      statusCode: 404,
    };
  }
};

export const getCategories = async (): ServicesExportType<Array<CategoriesType>> => {
  try {
    const category = await prisma.category.findMany({
      include: {
        styles: true,
      },
    });
    return {
      data: category,
      error: "",
      message: "Category created successfully",
      statusCode: 200,
    };
  } catch (error) {
    return {
      data: null,
      error: "",
      message: "",
      statusCode: 404,
    };
  }
};

export const getOneCategory = async ({ name }: GetOneCategoryInputType): ServicesExportType<Category> => {
  try {
    const category = await prisma.category.findUnique({
      where: { name },
      include: {
        styles: true,
      },
    });
    return {
      data: category,
      error: "",
      message: "",
      statusCode: 404,
    };
  } catch (error) {
    return {
      data: null,
      error: "",
      message: "",
      statusCode: 404,
    };
  }
};

export const deleteOneCategory = async ({ id }: CategoryInputType): ServicesExportType<any> => {
  try {
    const category = await prisma.category.delete({
      where: { id },
    });
    return {
      data: null,
      error: "",
      message: "Category delete successfully",
      statusCode: 404,
    };
  } catch (error) {
    return {
      data: null,
      error: "",
      message: "",
      statusCode: 404,
    };
  }
};

export const editOneCategory = async ({ id }: CategoryInputType): ServicesExportType<Category> => {
  try {
    const category = await prisma.category.update({
      where: { id },
      data: {},
    });
    return {
      data: category,
      error: "",
      message: "",
      statusCode: 404,
    };
  } catch (error) {
    return {
      data: null,
      error: "",
      message: "",
      statusCode: 404,
    };
  }
};
