import { Category } from "@prisma/client";
import { ServicesExportType } from "../../@types";
import prisma from "../db";
import {
  CategoriesType,
  CategoryEditInputType,
  CategoryInputType,
  CreateCategoryInputType,
  GetOneCategoryInputType,
} from "./@types/Category";

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
  } catch (error: any) {
    let errormessage = "";
    let errorCode = 404;
    if (error.message.includes("Category_name_key")) {
      errormessage = "Name already exists";
      errorCode = 400;
    }
    return {
      data: null,
      error: errormessage,
      message: "",
      statusCode: errorCode,
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
      message: "",
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
  const nameCheck = name || "";
  let newErrorCode = null;
  let newMessage = null;
  try {
    const category = await prisma.category.findUnique({
      where: { name: nameCheck },
      include: {
        styles: true,
      },
    });

    if (category === null) {
      newMessage = "Category not found";
      newErrorCode = 400;
    }

    return {
      data: category,
      error: "",
      message: newMessage || "",
      statusCode: newErrorCode || 200,
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

export const editOneCategory = async ({ id, data }: CategoryEditInputType): ServicesExportType<Category> => {
  let newMessage = null;
  let newStatusCode;
  try {
    const { coverImage, name } = data;
    const category = await prisma.category.update({
      where: { id },
      data: {
        ...(coverImage ? { coverImage } : {}),
        ...(name ? { name } : {}),
      },
    });
    return {
      data: category,
      error: "",
      message: "",
      statusCode: 200,
    };
  } catch (error: any) {
    if (error.message.includes("Record to update not found")) {
      newMessage = "Category to update not found";
    }
    return {
      data: null,
      error: "",
      message: newMessage || "",
      statusCode: 404,
    };
  }
};

export const deleteOneCategory = async ({ id }: CategoryInputType): ServicesExportType<any> => {
  let newMessage = null;
  try {
    const category = await prisma.category.delete({
      where: { id },
    });
    return {
      data: null,
      error: "",
      message: "Category delete successfully",
      statusCode: 200,
    };
  } catch (error: any) {
    if (error.message.includes("Record to delete does not exist")) {
      newMessage = "Category to delete does not exist";
    }
    return {
      data: null,
      error: "",
      message: newMessage || "",
      statusCode: 404,
    };
  }
};
