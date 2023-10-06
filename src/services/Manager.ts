import prisma from "../db";
import { ServicesExportType } from "../../@types";
import { Manager } from "@prisma/client";
import { UpdateManagerInfoType, UpdateManagerThemeType } from "./@types/Manager";

const limit = 30;

// get manager lists
export const getManagerList = async (page: number): ServicesExportType<Manager[]> => {
  try {
    const managers = await prisma.manager.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data: managers,
      error: null,
      message: ``,
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

// get manager by id
export const getManagerById = async (id: string): ServicesExportType<Manager | null> => {
  let message = "";
  try {
    const manager = await prisma.manager.findUnique({
      where: {
        id,
      },
    });
    if (manager === null) {
      message = "Manager does not exist";
      throw new Error("Manager does not exist");
    }
    return {
      data: manager,
      error: null,
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

// delete manager
export const deleteManager = async (id: string): ServicesExportType<null> => {
  let newMessage = null;

  try {
    await prisma.manager.delete({
      where: {
        id,
      },
    });
    return {
      data: null,
      error: "",
      message: "Manager delete successfully",
      statusCode: 200,
    };
  } catch (error: any) {
    // if the manager does not exist
    if (error.message.includes("Record to delete does not exist")) {
      newMessage = "Manager to delete does not exist";
    }
    return {
      data: null,
      error: error.message,
      message: newMessage || "",
      statusCode: 404,
    };
  }
};

//update manager info
export const updateManagerInfo = async (data: UpdateManagerInfoType): ServicesExportType<Manager | null> => {
  const { id, updateData } = data;
  const { firstname, lastname, dob, image } = updateData;
  try {
    const manager = await prisma.manager.update({
      where: {
        id,
      },
      data: {
        ...(firstname && { firstname }),
        ...(lastname && { lastname }),
        ...(dob && { dob }),
        ...(image && { image }),
      },
    });
    return {
      data: manager,
      error: null,
      message: `Manager with id ${id} has been updated successfully`,
      statusCode: 200,
    };
  } catch (error: any) {
    let message = "";
    let statusCode = 404;
    //if there is no style to update
    if (error.message.includes("Record to update not found")) {
      message = "Style to update not found";
      statusCode = 400;
    }
    return {
      data: null,
      error: error.message,
      message,
      statusCode,
    };
  }
};

// update manager ui theme
export const updateManagerTheme = async (data: UpdateManagerThemeType): ServicesExportType<Manager | null> => {
  const { id, preferredTheme } = data;
  try {
    const manager = await prisma.manager.update({
      where: {
        id,
      },
      data: {
        preferredTheme,
      },
    });
    return {
      data: manager,
      error: null,
      message: `Theme for manager with id ${id} has been updated successfully`,
      statusCode: 200,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: `Could not update theme for manager with id ${id}`,
      statusCode: 404,
    };
  }
};
