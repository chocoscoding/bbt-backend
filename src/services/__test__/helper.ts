import prisma from "../../db";

export const deleteAccountForTest = async ({ email, accountType }: { email: string; accountType: "manager" | "user" }) => {
  try {
    if (accountType === "manager") {
      await prisma.manager.delete({
        where: {
          email,
        },
      });
      return null;
    }
    if (accountType === "user") {
      await prisma.user.delete({
        where: {
          email,
        },
      });
      return null;
    }
    return null;
  } catch (error) {
    return null;
  }
};
