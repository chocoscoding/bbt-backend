import prisma from "../db";
import { ServicesExportType } from "../../@types";
import {
  CreateStyleInput,
  DeleteManyStylesInput,
  DeleteStyleInput,
  EditStyleInput,
  GetOneStyleInput,
  GetStylesInput,
  SearchStyleInput,
} from "./@types/Style";
import { Style } from "@prisma/client";

const paginationAmount = 30;
//create a style
export const createStyle = async (data: CreateStyleInput): ServicesExportType<Style> => {
  const { name, description, stylePictures, averageTime, categoryName, note,coverPicture } = data;
  try {
    //find a category by name
    const findCategory = await prisma.category.findUnique({
      where: { name: categoryName },
      select: {
        id: true,
      },
    });
    //if category doesn't exist
    if (!findCategory) {
      return {
        data: null,
        error: "category does not exist",
        message: "",
        statusCode: 404,
      };
    }
    //if category exists
    const createStyle = await prisma.style.create({
      data: {
        name,
        description,
        stylePictures,
        coverPicture,
        averageTime,
        categoryId: findCategory.id,
        note,
      },
    });

    return {
      data: createStyle,
      error: "",
      message: "",
      statusCode: 200,
    };
  } catch (error: any) {
    let errormessage = "";
    let errorCode = 404;
    //if category name already exists
    if (error.message.includes("Style_name_key")) {
      errormessage = "Style name already exists";
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

//edit one style
export const editOneStyle = async (data: EditStyleInput): ServicesExportType<Style> => {
  try {
    const { id, name, description, stylePictures,coverPicture, averageTime, categoryName, note } = data;
    let categoryId = undefined;
    if (categoryName) {
      //if the category name is provided
      const findCategory = await prisma.category.findUnique({
        where: { name: categoryName },
        select: {
          id: true,
        },
      });

      //if the category is null
      if (!findCategory) {
        return {
          data: null,
          error: "category does not exist",
          message: "",
          statusCode: 404,
        };
      }
      //else update the category id
      categoryId = findCategory.id;
    }

    //update the style
    const updatedStyle = await prisma.style.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(stylePictures && { stylePictures }),
        ...(coverPicture && { coverPicture }),
        ...(averageTime && { averageTime }),
        ...(categoryId && { categoryId }),
        ...(note && { note }),
      },
    });

    return {
      data: updatedStyle,
      error: "",
      message: "Style updated successfully",
      statusCode: 200,
    };
  } catch (error: any) {
    console.log(error);
    let errormessage = null;
    let newStatusCode = 404;

    //if there is no style to update
    if (error.message.includes("Record to update not found")) {
      errormessage = "Style to update not found";
      newStatusCode = 400;
    }
    //if the style name already exists
    if (error.message.includes("Style_name_key")) {
      errormessage = "Style name already exists";
      newStatusCode = 400;
    }
    return {
      data: null,
      error: "",
      message: errormessage || "",
      statusCode: newStatusCode,
    };
  }
};

//delete a style
export const deleteOneStyle = async (data: DeleteStyleInput): ServicesExportType<any> => {
  let newMessage = null;
  try {
    const style = await prisma.style.delete({
      where: { id: data.id },
    });
    return {
      data: null,
      error: "",
      message: "Style delete successfully",
      statusCode: 200,
    };
  } catch (error: any) {
    // if the style does not exist
    if (error.message.includes("Record to delete does not exist")) {
      newMessage = "Style to delete does not exist";
    }
    return {
      data: null,
      error: "",
      message: newMessage || "",
      statusCode: 404,
    };
  }
};

//delete multiple styles
export const deleteMultipleStyles = async (data: DeleteManyStylesInput): ServicesExportType<any> => {
  let newMessage = null;
  try {
    const style = await prisma.style.deleteMany({
      where: {
        id: {
          in: data.ids,
        },
      },
    });
    return {
      data: null,
      error: "",
      message: "Styles delete successfully",
      statusCode: 200,
    };
  } catch (error: any) {
    console.log(error);
    if (error.message.includes("Record to delete does not exist")) {
      newMessage = "Styles to delete does not exist";
    }
    return {
      data: null,
      error: "",
      message: newMessage || "",
      statusCode: 404,
    };
  }
};

//get one style
export const getOneStyle = async (data: GetOneStyleInput): ServicesExportType<any> => {
  let message = "";
  try {
    const { name } = data;
    const style = await prisma.style.findUnique({
      where: { name: data.name },
      include: {
        category: true,
      },
    });
    if (!style) {
      message = "Style does not exist";
      throw new Error("Style does not exist");
    }

    return {
      data: style,
      error: "",
      message,
      statusCode: 200,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message,
      statusCode: 404,
    };
  }
};

export const getAllStyles = async (data: GetStylesInput): ServicesExportType<Style[]> => {
  const { page } = data;
  try {
    const style = await prisma.style.findMany({
      skip: (page - 1) * paginationAmount,
      take: paginationAmount,
    });
    return {
      data: style,
      error: "",
      message: "",
      statusCode: 200,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: "",
      statusCode: 404,
    };
  }
};
export const searchStyle = async (data: SearchStyleInput): ServicesExportType<any> => {
  return {
    data: null,
    error: "",
    message: "",
    statusCode: 200,
  };
};
