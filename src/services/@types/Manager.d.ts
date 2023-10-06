import { Manager } from "@prisma/client";

interface UpdateManagerThemeType {
  id: string;
  preferredTheme: Manager["preferredTheme"];
}

interface UpdateManagerInfoType {
  id: string;
  updateData: Partial<Pick<Manager, "firstname" | "lastname" | "dob" | "image">>;
}
